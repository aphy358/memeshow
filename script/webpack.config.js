const { resolve, relative, join, isAbsolute, parse, format } = require("path")
const { existsSync } = require("fs")
const globby = require("globby")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const SRCPATH = resolve(__dirname, "./src")
const DISTPATH = resolve(__dirname, "./dist")

module.exports = env => {
  const { entry } = walkApp(SRCPATH)
  const prod = !!env.production

  return {
    entry,

    mode: prod ? "production" : "development",

    // 小程序不支持eval，不能使用eval相关的devtool
    // devtool: prod ? false : "source-map",
    devtool: false,

    output: {
      path: DISTPATH,
      filename: "[name]",
      globalObject: "wx"
    },

    plugins: [
      new CleanWebpackPlugin()
    ]

  }
}

/**
 * 遍历 `app`
 *
 * @desc 通过 `app.json` 遍历小程序页面、全局组件、分包、多线程
 * @param {string} root
 * @returns {object} entry
 */

function walkApp(root) {
  const {
    pages,
    workers,
    subpackages,
    usingCompoents
  } = require(join(root, "app.json"))

  let entry = {},
      resource = {}

  pages && pages.forEach(page => walkPage(page, entry))
  // subpackages && walkSubPackages(entry)
  // usingCompoents && walkComponents(entry)

  return {
    entry,
    resource
  }
}

/**
 * 遍历 `pages`
 *
 * @param {string} page - the path of page
 * @param {object} entry
 */

function walkPage(page, entry) {
  const pagePath = getAbsPath(suffixPath(page))
  if (!pathChecker(pagePath)) return

  entry[relative(SRCPATH, pagePath)] = pagePath
}

/**
 * 遍历 `components`
 *
 * @param {object} entry
 */

function walkComponents(entry) {}

/**
 * 遍历 `分包`
 *
 * @param {object} entry
 */

function walkSubPackages(entry) {}

/**
 * 遍历 `workr 线程`
 *
 * @param {object} entry
 */

function walkWorker(entry) {}

/**
 * 填充 `拓展名`
 *
 * @param {string} path
 * @param {string} ext - 填充的拓展名
 */

function suffixPath(path, exten = "js") {
  let { ext, base, ...others }  = parse(path)
  ext = ext || `.${exten}`
  return format({ ext, ...others })
}

/**
 * 获取 `绝对路径`
 *
 * @param {string} path
 * @returns {string}
 */

function getAbsPath(path) {
  return isAbsolute(path) ? path : resolve(SRCPATH, path)
}

/**
 * 校验路径是否存在
 *
 * @param {string} path - 绝对地址
 * @returns {boolean}
 */

function pathChecker(path) {
  return existsSync(path)
}