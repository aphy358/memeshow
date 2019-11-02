const { existsSync } = require("fs")
const {
  parse,
  format,
  dirname,
  basename,
  join,
  resolve,
  relative,
  isAbsolute
} = require("path")

/**
 * 为路径填充拓展名
 * 默认填充 `.js`
 *
 * @param {string} path
 * @param {string} [exten="js"] - 填充的拓展名
 * @returns {string} 带后缀的文件路径
 */

exports.getSuffixPath = function(path, exten = "js") {
  let { ext, base, ...others } = parse(path)
  ext = `.${exten}`
  return format({ ext, ...others })
}

/**
 * 获取绝对路径
 *
 * @param {string} path
 * @returns {string} 绝对路径
 */

exports.getAbsPath = function(path, root) {
  return isAbsolute(path) ? path : resolve(root, path)
}

/**
 * 校验路径或文件是否存在
 *
 * @param {string} path - 绝对地址
 * @returns {boolean}
 */

exports.pathChecker = function(path) {
  if (!isAbsolute(path)) return new Error("参数应该为绝对路径!")
  return existsSync(path)
}
