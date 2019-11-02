/**
 * WORK IN PROGRESS
 */

const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { existsSync } = require("fs")
const {
  dirname,
  resolve,
  relative,
  join,
  parse,
  format,
  isAbsolute
} = require("path")
const { getAbsPath, getSuffixPath, pathChecker } = require("./path+")

const SRCPATH = resolve(__dirname, "../src")
const DISTPATH = resolve(__dirname, "../dist")
const DEPFILES = ["wxml", "json", "wxss", "scss"]

module.exports = env => {
  const prod = !!env.production
  const entry = walkApp(join(SRCPATH, "app"))

  return {
    mode: prod ? "production" : "development",

    // 小程序不支持eval，不能使用eval相关的devtool
    // devtool: prod ? false : "source-map",
    devtool: false,

    entry,

    output: {
      // todo path: DISTPATH,
      path: resolve("dist:ts"),
      filename: "[name]",
      globalObject: "wx"
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          type: "javascript/auto",
          use: [
            {
              loader: "file-loader",
              options: {
                context: SRCPATH,
                name: "[path][name].[ext]"
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /.wxs$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: SRCPATH,
                name: "[path][name].[ext]"
              }
            },
            "babel-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.wxml$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: SRCPATH,
                name: "[path][name].[ext]"
              }
            },
            {
              loader: "wxml-loader",
              options: {
                root: SRCPATH,
                enforceRelativePath: true,
                // TODO <input></input> 需要写成 <input/>，否则 minify 后错误
                minimize: prod,
                transformUrl(url, resource) {
                  // url 是资源相对于 root 的相对路径，需要转换为相对于 resource 的相对路径
                  const result = relative(
                    dirname(resource),
                    resolve(SRCPATH, url)
                  )
                  return result
                }
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.wxss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: SRCPATH,
                name: "[path][name].[ext]"
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: SRCPATH,
                name: "[path][name].wxss"
              }
            },
            "postcss-loader",
            "sass-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: SRCPATH,
                name: "[path][name].[ext]"
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },

    plugins: [new CleanWebpackPlugin()],

    optimization: {
      splitChunks:  {
        chunks: "all"
      }
    }
  }
}

/**
 * 遍历 `app`
 * 通过 `app.json` 遍历小程序页面、全局组件、分包、多线程
 * 复制小程序根目录下的资源
 *
 * @param {string} appEntry
 *
 * @returns {object} modules
 * @returns {object} modules.entry
 * @returns {string[]} modules.resources
 *
 * @todo
 */

function walkApp(appEntry) {
  const entryPoint = getSuffixPath(appEntry)
  if (!pathChecker(entryPoint)) return new Error("请配置正确的入口文件")

  // 初始化特殊依赖
  let resources = [
    resolve(SRCPATH, "project.config.json"),
    resolve(SRCPATH, "sitemap.json")
  ]

  /**
   * 添加 `entry` 需要遍历相关依赖
   * 利用 `proxy` 劫持 `entry` 对象
   * 返回时依赖作为单独 chunk
   */

  let entry = new Proxy(
    {},
    {
      set(obj, chunkName, path) {
        const prop = relative(SRCPATH, chunkName)
        if (prop in obj) return
        obj[prop] = path
        resources = [...resources, ...collect(path, DEPFILES)]
      }
    }
  )

  // 初始化 entryPoint
  entry[entryPoint] = entryPoint
  const {
    pages,
    workers,
    subpackages,
    usingCompoents: components
  } = require(`${appEntry}.json`)

  pages && pages.forEach(page => walkPage(page, entry))
  components && components.forEach(cmp => walkComponent(cmp, entry))
  subpackages && subpackages.forEach(package => walkSubPackages(package, entry))

  return {
    ...entry,
    __resources__: resources
  }
}

/**
 * 遍历 `pages`
 *
 * @param {string} path - the path of page
 * @param {object} entry
 */

function walkPage(path, entry) {
  const absPath = getAbsPath(getSuffixPath(path), SRCPATH)
  if (!pathChecker(absPath)) return
  entry[absPath] = absPath

  const components = getComponentsEntries(path)
  if (components.length > 0)
    components.forEach(cmp => walkComponent(cmp, entry))
}

/**
 * 获取组件依赖
 *
 * @param {string} path
 * @returns {string[]}
 */

function getComponentsEntries(path) {
  const filePath = getAbsPath(getSuffixPath(path, "json"), SRCPATH)
  if (!pathChecker(filePath)) return []

  const { usingComponents: components } = require(filePath)
  return !!components
    ? Object.values(components).map(relPath =>
        resolve(dirname(filePath), relPath)
      )
    : []
}

/**
 * 遍历 `components`
 *
 * @param {string} path
 * @param {object} entry
 * @todo distinguish
 */

function walkComponent(path, entry) {
  return walkPage(path, entry)
}

/**
 * 遍历 `分包`
 *
 * @param {object} entry
 */

function walkSubPackages(package, entry) {
  const subRoot = resolve(SRCPATH, package.root)
  package.pages.forEach(page => walkPage(join(subRoot, page), entry))
}

/**
 * 遍历 `workr 线程`
 *
 * @todo
 * @param {object} entry
 */

function walkWorker(entry) {}

/**
 * 收集路径里相关的依赖
 *
 * @param {string} path - 绝对路径
 * @param {object} types - 依赖列表
 * @returns {string[]} resources
 */

function collect(path, types) {
  const { dir, base, name, ext } = parse(getAbsPath(path, SRCPATH))
  return types
    .map(target => join(dir, `${name}.${target}`))
    .filter(target => pathChecker(target))
}
