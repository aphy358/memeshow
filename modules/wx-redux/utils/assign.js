/**
 * 合并多个对象合并，Object.assign 的兼容性实现
 *
 * @param {object[]} targets
 * @return {object}
 */

export default function assign(...targets) {
  // We must check against these specific cases.
  if (targets.length <= 0) {
    throw new TypeError("Cannot convert undefined or null to object")
  }

  let output = Object(targets[0])

  for (let index = 1, length = targets.length; index < length; index++) {
    let source = targets[index]
    if (source !== undefined && source !== null) {
      for (let nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}
