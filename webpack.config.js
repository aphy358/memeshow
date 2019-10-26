const { resolve, dirname, parse, relative, join } = require("path")
const { removeSync } = require("fs-extra")
const { existsSync } = require("fs")
const fs = require("fs")
const _ = require("lodash")
const globby = require("globby")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MoveFilesPlugin = require("./plugins/moveFilesPlugin")

const base = resolve(".")
const baseModules = resolve("./node_modules")
const src = resolve("./src")
const dist = resolve("./dist")
const moduleDirAlias = "_vendors"

/**
 * 从app.json中的pages作为起点 构建依赖树
 * @param {String} app - app的路径
 */
const walkEntries = app => {
  const entries = { app }
  const resolves = []
  // console.info(`walk entries:\n\t app => ${app}`)
  const appRoot = dirname(app)

  // 遍历pages
  const { pages = [], subpackages = [], tabBar = {} } = require(resolve(
    appRoot,
    "app.json"
  ))
  pages.forEach(it => walkPageEntries(resolve(appRoot, it), entries, resolves))

  // 加入app目录下的custom-tab-bar
  walkPageEntries(resolve(appRoot, "custom-tab-bar/index"), entries, resolves)

  subpackages.forEach(it =>
    walkSubPackageEntries(appRoot, it, entries, resolves)
  )
  walkEntryResources(appRoot, entries)
  walkTabBarAssets(appRoot, tabBar, entries)
  return { entries, resolves }
}

/**
 * 以page为入口遍历页面依赖的组件
 * @param {String} page
 * @param {Object} entries
 * @param {String[]} resolves
 * @param {String} indent
 */
const walkPageEntries = (page, entries, resolves, indent = "\t\t") => {
  const path = fullScriptPath(page)
  if (!path) return
  const { dir, name } = parse(path)
  const entryName = relative(src, resolve(dir, name))
  entries[entryName] = path
  // console.info(`${indent}page => ${path}`)
  walkComponentEntries(path, entries, resolves, `${indent}\t`)
}

const walkSubPackageEntries = (
  appRoot,
  package,
  entries,
  resolves,
  indent = "\t\t"
) => {
  const { root, pages = [] } = package
  const packageRoot = resolve(appRoot, root)
  // console.info(`${indent}subPackage => ${packageRoot}`)
  pages.forEach(it =>
    walkPageEntries(resolve(packageRoot, it), entries, resolves, `${indent}\t`)
  )
}

/**
 * 以组件为入口 递归遍历组件依赖的组件
 * @param {string} instancePath
 * @param {object} entries
 * @param {string[]} resolves
 * @param {string} indent
 */
const walkComponentEntries = (instancePath, entries, resolves, indent) => {
  const { dir, name } = parse(instancePath)
  const path = resolve(dir, `${name}.json`)
  if (!existsSync(path)) {
    return
  }
  const { usingComponents = {} } = require(path)
  _.values(usingComponents).forEach(it => {
    walkComponent(path, it, entries, resolves, indent)
  })
}

/**
 * 遍历组件 发现有依赖其他组件且没有添加到入口集合中 则遍历该组件
 * @param {string} parentJsonPath
 * @param {string[]} componentPath
 * @param {object} entries
 * @param {string[]} resolves
 * @param {string} indent
 */
const walkComponent = (
  parentJsonPath,
  componentPath,
  entries,
  resolves,
  indent
) => {
  const parentDir = parse(parentJsonPath).dir
  // 先尝试在调用者目录中查找
  let path = fullScriptPath(resolve(parentDir, componentPath))
  if (!path) {
    // 不存在，尝试在node_modules中查找
    path = fullScriptPath(resolve(baseModules, componentPath))
    if (path) {
      const { name, dir } = parse(path)
      const from = join(dist, relative(src, parentDir))
      // 小程序会忽略node_modules目录，使用其它目录名
      const to = join(dist, relative(base, dir)).replace(
        "node_modules",
        moduleDirAlias
      )
      // 替换配置的路径
      resolves.push({
        parent: parentJsonPath,
        component: componentPath,
        resolveTo: join(relative(from, to), name)
      })
    }
  }
  if (!path) return
  const isVendor = path.indexOf(baseModules) === 0
  // trim ext
  const { dir, name } = parse(path)
  const entryPath = resolve(dir, name)
  // node_modules下的组件保持相对base的路径，src下的组件保持相对src的路径
  let entryName = isVendor
    ? relative(base, entryPath)
    : relative(src, entryPath)
  // 小程序会忽略node_modules目录，使用其它目录名
  entryName = entryName.replace("node_modules", moduleDirAlias)
  if (!entries[entryName]) {
    entries[entryName] = path
    // console.info(`${indent}component => ${path}`)
    walkComponentEntries(path, entries, resolves, `${indent}\t`)
  }
}

/**
 * 遍历app.json中tabbar中定义的tab页面
 * @param {string} appRoot
 * @param {object} tabBar
 * @param {string[]} entries
 * @param {string} indent
 */
const walkTabBarAssets = (appRoot, tabBar, entries, indent = "\t\t") => {
  let assets = []
  ;(tabBar.list || []).forEach(it => {
    const iconPath = it.iconPath
    const selectedIconPath = it.selectedIconPath
    if (iconPath) assets.push(resolve(appRoot, iconPath))
    if (selectedIconPath) assets.push(resolve(appRoot, selectedIconPath))
  })
  assets = _.uniq(assets)
  if (!_.isEmpty(assets)) {
    entries._assets = _.concat(entries._assets || [], assets)
    // assets.forEach(it => console.info(`${indent}tabIcon => ${it}`))
  }
}

/**
 * 遍历入口依赖的资源 由于文件同名 所以匹配后缀
 * @param {string} appRoot
 * @param {string[]} entries
 * @param {string} indent
 */
const walkEntryResources = (appRoot, entries, indent = "\t\t") => {
  const patterns = _.values(entries).map(it => {
    const { dir, name } = parse(it)
    return resolve(dir, `${name}.(json|wxss|wxml|scss)`)
  })
  patterns.push(resolve(appRoot, "project.config.json"))
  const resources = globby.sync(patterns, {
    cwd: appRoot,
    nodir: true,
    realpath: true,
    ignore: ["**/*.js"]
  })
  if (!_.isEmpty(resources)) {
    entries._assets = _.concat(entries._assets || [], resources)
    // resources.forEach(it => console.info(`${indent}resource => ${it}`))
  }
}

const vendorFileLoader = () => {
  return {
    loader: "file-loader",
    options: {
      context: base,
      name: "[path][name].[ext]",
      // 小程序会忽略node_modules目录，使用其它目录名
      outputPath: url => url.replace("node_modules", moduleDirAlias)
    }
  }
}

const resolveRules = resolves => {
  const resolvesByFiles = _.groupBy(resolves, "parent")
  const results = _.keys(resolvesByFiles).map(it => {
    return {
      test: new RegExp(`${parse(it).base}$`),
      loader: "string-replace-loader",
      options: {
        multiple: resolvesByFiles[it].map(it => ({
          search: it.component,
          replace: it.resolveTo
        }))
      }
    }
  })
  return results
}

const fullScriptPath = path => {
  const { dir, name, ext } = parse(path)
  if (!!ext && existsSync(path)) return path
  if (!ext) {
    const candidates = [
      resolve(dir, `${name}.js`),
      resolve(dir, name, "index.js")
    ]
    const result = candidates.find(existsSync)
    if (result) return result
  }
  return null
}

/**
 * 获取某个路径下的所有文件夹，并以数组的形式返回
 * @param {string} path
 */
const getFolders = path => {
  let entriesFolder = resolve(src, path)
  let dirs = fs.readdirSync(entriesFolder)
  return dirs.filter(o => o.indexOf(".") === -1)
}

/**
 * 设置分包 common 包的配置，格式统一为 common_ + 分包名，比如 common_IM
 */
const setSubPackageCommmon = () => {
  const dirs = getFolders("packages/")
  let resObj = {}
  for (let i = 0; i < dirs.length; i++) {
    const ele = dirs[i]
    resObj["common_" + ele] = {
      chunks: "all",
      test: new RegExp("packages\\/" + ele),
      minChunks: 2,
      name: "common_" + ele,
      priority: 5
    }
  }

  return resObj
}

/**
 * 拼接文件移动插件的入参
 */
const getMoveFilesObj = () => {
  const dirs = getFolders("packages/")
  let resObj = []
  for (let i = 0; i < dirs.length; i++) {
    const ele = dirs[i]
    resObj.push(
      {
        from: resolve(dist, "common_" + ele + ".js"),
        to: resolve(dist, "packages/" + ele + "/common_" + ele + ".js")
      },
      {
        from: resolve(dist, "common_" + ele + ".js.map"),
        to: resolve(dist, "packages/" + ele + "/common_" + ele + ".js.map")
      }
    )
  }

  return resObj
}

const resConfig = env => {
  const mode = env.NODE_ENV
  const prod = mode === "production"
  // console.info(`building in ${mode} mode`)
  // console.info(`project base\t=> ${base}`)
  // console.info(`project node_modules\t=> ${baseModules}`)
  // console.info(`project src\t=> ${src}`)
  // console.info(`project dist\t=> ${dist}`)

  // 构建先清理
  removeSync(dist)

  // 从app开始，遍历出所有入口文件
  const { entries, resolves } = walkEntries(resolve(src, "app.js"))

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
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        },
        // 拷贝资源时，src下的资源保持相对src的路径，node_modules下的资源保持相对base的路径
        {
          test: /.wxs$/,
          use: [
            {
              loader: "file-loader",
              options: { context: src, name: "[path][name].[ext]" }
            },
            "babel-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /.wxs$/,
          use: [vendorFileLoader(), "babel-loader"],
          include: /node_modules/
        },
        {
          test: /\.wxss$/,
          use: [
            {
              loader: "file-loader",
              options: { context: src, name: "[path][name].[ext]" }
            },
            "postcss-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.wxss$/,
          use: [vendorFileLoader(), "postcss-loader"],
          include: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: { context: src, name: "[path][name].wxss" }
            },
            "postcss-loader",
            "sass-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.wxml$/,
          use: [
            {
              loader: "file-loader",
              options: { context: src, name: "[path][name].[ext]" }
            },
            {
              loader: "wxml-loader",
              options: {
                root: src,
                enforceRelativePath: true,
                // TODO <input></input> 需要写成 <input/>，否则 minify 后错误
                minimize: prod,
                transformUrl(url, resource) {
                  // url 是资源相对于 root 的相对路径，需要转换为相对于 resource 的相对路径
                  return relative(dirname(resource), resolve(src, url))
                }
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.wxml$/,
          use: [
            vendorFileLoader(),
            {
              loader: "wxml-loader",
              options: {
                root: base,
                enforceRelativePath: true,
                // TODO <input></input> 需要写成 <input/>，否则 minify 后错误
                minimize: prod,
                transformUrl(url, resource) {
                  // url 是资源相对于 root 的相对路径，需要转换为相对于 resource 的相对路径
                  return relative(dirname(resource), resolve(base, url))
                }
              }
            }
          ],
          include: /node_modules/
        },
        {
          test: /.json$/,
          type: "javascript/auto",
          use: [
            {
              loader: "file-loader",
              options: { context: src, name: "[path][name].[ext]" }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /.json$/,
          type: "javascript/auto",
          use: [vendorFileLoader()],
          include: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: { context: src, name: "[path][name].[ext]" }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [vendorFileLoader()],
          include: /node_modules/
        },
        // 替换引用node_modules内的组件为真实路径
        ...resolveRules(resolves)
      ]
    },
    // 警告 webpack 的性能提示
    performance: {
      hints: "warning",
      assetFilter: function(assetFilename) {
        return assetFilename.indexOf("common_IM.js") === -1
      }
    },
    optimization: {
      // 公共代码抽取
      runtimeChunk: {
        name: "runtime"
      },
      splitChunks: {
        cacheGroups: {
          common: {
            chunks(chunk) {
              return chunk.name.indexOf("packages") === -1
            },
            minChunks: 2,
            name: "common",
            priority: 10
          },
          // 针对所有分包下的公共模块进行单独打包
          ...setSubPackageCommmon()
        }
      }
    },
    plugins: [
      // 在entry头部引入公共代码
      new webpack.BannerPlugin({
        banner: options => {
          const chunkPath = dirname(resolve(src, options.filename))
          const isPackage = chunkPath.indexOf("packages") !== -1
          let subPackageName = ""
          if (isPackage) {
            let restPath = chunkPath.split("/packages/")[1]
            let index = restPath.indexOf("/")
            subPackageName = restPath.substring(0, index)
          }
          let deps = isPackage
            ? ["common_" + subPackageName]
            : ["runtime", "common"]

          const requires = deps.map(it => {
            const path = resolve(src, `${it}.js`)
            let res = relative(chunkPath, path)

            // 分包 common_**.js 本身不需要引用主包 runtime.js 和 common.js，直接 return
            if (options.chunk.name.indexOf("common_") !== -1) {
              return ""
            }

            // 如果是分包 common_**.js，则路径减少两层（以满足后续文件移动后能正确执行）
            // 注意，实际情况下，如果不满足公共代码抽离的标准的话，可能并不会打包出相应的 common_**.js
            // 这种情况下我们自主开发的插件 MoveFilesPlugin 会到相应目录下创建一个空的 common_**.js，这样就不会报错了
            if (it.indexOf("common_") !== -1) {
              res = res.substr(6)
            }

            return `require("${res}");`
          })

          return deps.indexOf(options.chunk.name) > -1 ? "" : requires.join("")
        },
        raw: true,
        entryOnly: true
      }),

      // 拷贝资源
      new CopyWebpackPlugin([
        {
          from: resolve(src, "sitemap.json"),
          to: resolve(dist, "sitemap.json")
        }
      ]),

      // 移动文件到指定目录
      new MoveFilesPlugin(getMoveFilesObj())
    ]
  }
}
module.exports = resConfig
resConfig({
  NODE_ENV: "production" // development
})
