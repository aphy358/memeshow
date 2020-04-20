const { resolve, dirname, parse, relative, isAbsolute, sep } = require("path")
const { removeSync } = require("fs-extra")
const { existsSync } = require("fs")
const _ = require("lodash")
const globby = require("globby")
const argv = require('yargs').argv
const colors = require('colors/safe')
const webpack = require("webpack")

const proj = argv.proj
if (!proj) {
  console.log(colors.red('usage: npm run <dev|build> -- --proj <project>'))
  process.exit(1)
}

// 工作目录
const base = resolve('.')
// 项目根目录
const src = resolve(base, proj)
// node_modules目录
const nodeModules = resolve('./node_modules')
// 用户公共组件目录
const customModules = resolve('./modules')
// 打包输出目录
const dist = resolve(`./dist/${proj}`)
// 公共组件打包输出目录
// TODO 小程序会忽略 node_modules 目录，因此 node_modules 中的组件也发布到这里
const distModules = resolve(dist, '_modules')
// 打包入口
const entries = {}
// 路径别名
const resolves = []
// 分包信息
const packages = []
// 提取公共代码
const splits = {}

const walkProject = () => {
  // app.js 作为主入口
  entries.app = resolve(src, 'app.js')

  // 从 app.json 解析依赖
  const appJson = resolve(src, 'app.json')
  const { pages = [], usingComponents = {}, subpackages = [], tabBar = {} } = require(appJson)

  // 页面
  pages.forEach(it => {
    const path = resolveFullScriptPath(src, it)
    if (!path) {
      console.log(colors.yellow(`can't find page: ${it}`))
      return
    }
    walkPage(path)
  })

  // 全局组件
  _.values(usingComponents).forEach(it => {
    const configContext = distContext(appJson)
    // resolve relative to project dir
    let path = resolveFullScriptPath(src, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    // resolve in node_modules dir
    path = resolveFullScriptPath(nodeModules, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    // resolve in custom modules dir
    path = resolveFullScriptPath(customModules, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    console.log(colors.yellow(`can't find component: ${it}`))
  })

  // 分包
  subpackages.forEach(it => walkSubpackage(it))

  // tabbar 资源
  walkTabBar(tabBar)

  // js关联的 .json .wxml .wxss .scss ...
  walkEntries()
}

const walkPage = path => {
  const context = distContext(path)
  if (!context) return
  if (setEntry(context)) {
    walkComponentsRecursively(path, context)
  }
}

const walkComponent = (path, configContext, originalPath) => {
  const context = distContext(path)
  if (!context) return
  // 配置文件中组件路径替换为真实路径
  setResolves(context, configContext, originalPath)
  if (setEntry(context)) {
    walkComponentsRecursively(path, context)
  }
}

const walkComponentsRecursively = (path, context) => {
  const { rootPath } = context
  const { dir, name } = parse(path)
  const configPath = resolve(dir, `${name}.json`)
  if (!existsSync(configPath)) return
  const configContext = distContext(configPath)
  const { usingComponents = {} } = require(configPath)
  _.values(usingComponents).forEach(it => {
    // resolve relative to parent
    let path = resolveFullScriptPath(dir, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    // resolve relative to parent's root
    path = resolveFullScriptPath(rootPath, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    // resolve in node_modules dir
    path = resolveFullScriptPath(nodeModules, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    // resolve in custom modules dir
    path = resolveFullScriptPath(customModules, it)
    if (path) {
      walkComponent(path, configContext, it)
      return
    }
    // can't resolve
    console.log(colors.yellow(`can't find sub component: ${configPath}, ${it}`))
  })
}

const setEntry = context => {
  // 打包入口名需要去除文件后缀
  const { dir, name } = parse(context.distPath)
  const entryName = relative(dist, resolve(dir, name))
  if (!entries[entryName]) {
    entries[entryName] = context.path
    return true
  }
  return false
}

const distContext = path => {
  // 如果是 node_modules/用户公共组件，发布到统一的模块目录distModules，其余发布到项目目录dist
  const rootPath = [src, nodeModules, customModules].find(it => path.indexOf(it) === 0)
  if (!rootPath) {
    console.log(colors.yellow(`invalid path: ${path}`))
    return
  }
  const isModule = [nodeModules, customModules].indexOf(rootPath) >= 0
  const relativePath = relative(rootPath, path)
  const distRootPath = isModule ? distModules : dist
  const distPath = resolve(distRootPath, relativePath)
  return { path, rootPath, relativePath, distRootPath, distPath, isModule }
}

const setResolves = (context, configContext, originalPath) => {
  const configDistPath = configContext.distPath
  const configDirPath = dirname(configDistPath)
  const compDistPath = context.distPath
  // trim ext as import path
  const compDistImportPath = compDistPath.split('.').slice(0, -1).join('.')
  const resolvedPath = relative(configDirPath, compDistImportPath)
  const configEntryName = relative(dist, configDistPath)
  if (resolvedPath !== originalPath) {
    resolves.push({
      entry: configEntryName,
      from: originalPath,
      to: resolvedPath
    })
  }
}

const walkSubpackage = subpackage => {
  const { root, pages = [], independent = false } = subpackage
  const rootPath = resolve(src, root)
  pages.forEach(it => {
    const path = resolveFullScriptPath(rootPath, it)
    if (!path) {
      console.log(colors.yellow(`can't find subpackage page: ${rootPath}, ${it}`))
      return
    }
    walkPage(path)
  })
  // 分包信息
  const name = relative(src, rootPath).replace(sep, '_')
  const splitName = `common_${name}`
  const { distPath } = distContext(resolve(rootPath, splitName))
  const splitDistPath = distPath
  packages.push({ name, splitName, splitDistPath, rootPath, independent })
  // 提取公共代码
  const split = {
    chunks(chunk) {
      // 仅处理分包内
      return resolve(dist, chunk.name).indexOf(dirname(splitDistPath)) === 0
    },
    test(mod) {
      // 独立分包只能引用自己
      // TODO node_modules & 用户公共模块 在独立分包会被内联
      return !independent || !mod.resource || mod.resource.indexOf(rootPath) === 0
    },
    enforce: true,
    minChunks: 2,
    // 输出到分包目录下
    name: relative(dist, splitDistPath),
    priority: 10
  }
  splits[splitName] = split
}

const walkEntries = () => {
  const patterns = _.values(entries).map(it => {
    const { dir, name } = parse(it)
    return resolve(dir, `${name}.(json|wxml|wxss|scss)`)
  })
  _.forEach(['project.config.json', 'sitemap.json'], it => patterns.push(resolve(src, it)))
  const resources = globby.sync(patterns, {
    cwd: base,
    nodir: true,
    realpath: true,
    ignore: ["**/*.js"]
  })
  if (!_.isEmpty(resources)) {
    entries._assets = _.concat(entries._assets || [], resources)
  }
}

const walkTabBar = tabBar => {
  if (tabBar.custom) {
    const path = resolveFullScriptPath(src, '/custom-tab-bar/index.js')
    if (!path) {
      console.log(colors.yellow(`can't find custom tabBar: ${path}`))
      return
    }
    walkPage(path)
  } else {
    // 非自定义 tabBar
    const assets = _.uniq(
      _.filter(_.flattenDeep(_.map(tabBar.list || [], it => [
        resolveFullResourcePath(src, it.iconPath), resolveFullResourcePath(src, it.selectedIconPath)
      ])))
    )
    if (!_.isEmpty(assets)) {
      entries._assets = _.concat(entries._assets || [], assets)
    }
  }
}

const distPathFileLoader = transform => {
  return {
    loader: "file-loader",
    options: {
      context: base,
      name: "[path][name].[ext]",
      outputPath: path => {
        const fullPath = resolve(base, path)
        const context = distContext(fullPath)
        if (!context) throw new Error(`invalid file-loader path ${path}`)
        const outputPath = relative(dist, context.distPath)
        return transform ? transform(outputPath) : outputPath
      }
    }
  }
}

const resolveRules = resolves => {
  const resolvesByEntries = _.groupBy(resolves, 'entry')
  const rules = _.keys(resolvesByEntries).map(it => {
    return {
      test: new RegExp(`${it}$`),
      loader: "string-replace-loader",
      options: {
        multiple: resolvesByEntries[it].map(it => ({
          search: it.from,
          replace: it.to
        }))
      }
    }
  })
  return rules
}

const resolveFullResourcePath = (root, ...segments) => {
  const path = _.reduce(segments, (path, it) => isAbsolute(it) ? resolve(`${root}${it}`) : resolve(path, it), root)
  return existsSync(path) ? path : null
}

const resolveFullScriptPath = (root, ...segments) => {
  const path = _.reduce(segments, (path, it) => isAbsolute(it) ? resolve(`${root}${it}`) : resolve(path, it), root)
  const { dir, name, ext } = parse(path)
  const candidates = [
    path,
    resolve(dir, `${name}.js`),
    resolve(dir, name, "index.js"),
  ]
  if (ext) {
    candidates.push(resolve(dir, `${name}.${ext}.js`))
    candidates.push(resolve(dir, `${name}.${ext}`, "index.js"))
  }
  return candidates.find(existsSync)
}

const build = env => {
  const mode = env.NODE_ENV
  const prod = mode === "production"
  const profile = env.profile || 'prod'

  // 构建前先清理
  removeSync(dist)

  // 遍历项目建立构建信息
  walkProject()

  return {
    mode,
    output: {
      publicPath: "",
      filename: "[name].js",
      path: dist,
      // 小程序不支持window，使用wx作为全局对象
      globalObject: "wx"
    },
    entry: entries,
    // 小程序不支持eval，不能使用eval相关的devtool
    devtool: prod ? false : "source-map",
    resolve: {
      // 扩展js库查找路径
      modules: [nodeModules, customModules],
      // 设置别名
      alias: {
        // 项目根目录
        '@': src,
        // 配置文件
        'config$': resolve(src, `configs/${profile}.js`)
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        },
        {
          test: /.wxs$/,
          use: [distPathFileLoader(), "babel-loader"]
        },
        {
          test: /\.wxss$/,
          use: [distPathFileLoader(), "postcss-loader"]
        },
        {
          test: /\.scss$/,
          use: [
            distPathFileLoader(path => path.substr(0, path.lastIndexOf('.')) + '.wxss'),
            "postcss-loader", "sass-loader"]
        },
        {
          test: /\.wxml$/,
          use: [
            distPathFileLoader(),
            // wxml中引入的资源
            {
              loader: "wxml-loader",
              options: {
                // 当引入的资源是绝对路径时，以root作为根目录
                // 例如 <img src="/assets/t.png" />，会引入 ${root}/assets/t.png
                root: src,
                publicPath: '',
                enforceRelativePath: true,
                minimize: prod,
                ignoreCustomFragments: [/<\/input>/],
                removeRedundantAttributes: false,
                transformUrl(assetDistRelativePath, wxmlPath) {
                  const from = dirname(distContext(wxmlPath).distPath)
                  const to = resolve(dist, assetDistRelativePath)
                  return relative(from, to)
                }
              }
            }
          ]
        },
        {
          test: /.json$/,
          type: "javascript/auto",
          use: [distPathFileLoader()]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [distPathFileLoader()]
        },
        // 替换配置文件中的组件路径为实际路径
        ...resolveRules(resolves)
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          // 分包公共代码
          ...splits,
          // 全局公共代码
          common: {
            chunks(chunk) {
              // 不处理独立分包
              return packages.findIndex(
                it => it.independent && resolve(dist, chunk.name).indexOf(dirname(it.splitDistPath)) === 0
              ) < 0
            },
            test(mod) {
              // 不引用分包中的模块
              return !mod.resource || _.every(packages, it => mod.resource.indexOf(it.rootPath) < 0)
            },
            enforce: true,
            minChunks: 1,
            name: "common",
            priority: 20
          }
        }
      }
    },
    plugins: [
      // 在entry头部引入公共代码
      new webpack.BannerPlugin({
        banner: options => {
          // 公共chunks
          const chunks = [resolve(dist, 'common.js')]
          // entry路径
          const path = resolve(dist, options.filename)
          // entry所在的分包信息
          const package = packages.find(it => path.indexOf(dirname(it.splitDistPath)) === 0)
          // 计算依赖chunks
          let depChunks
          if (package) {
            const pkgChunks = [`${package.splitDistPath}.js`]
            if (package.independent) {
              // 独立分包，只依赖自身
              depChunks = pkgChunks
            } else {
              // 非独立分包，依赖公共&自身
              depChunks = _.concat(chunks, pkgChunks)
            }
          } else {
            // 不在分包内，依赖公共
            depChunks = chunks
          }

          // 避免循环引用
          if (depChunks.indexOf(path) >= 0) return ''

          // windows下路径分隔符需要替换为/
          return depChunks.map(it => `require("${relative(dirname(path), it).replace(/\\/g, '/')}");`).join('')
        },
        raw: true,
        entryOnly: true
      })
    ]
  }
}

module.exports = build