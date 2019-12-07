/**
 *
 * @param {*} constant 常量
 * @param {*} value 取text
 */
export const value2Text = function (constant, value) {
  const v2t = {}
  Object.keys(constant).forEach(key => {
    const v = constant[key].value
    if (Array.isArray(v)) {
      v.forEach(it => {
        v2t[it] = constant[key].text
      })
    } else {
      v2t[constant[key].value] = constant[key].text
    }
  })
  if (!v2t[value]) {
    return
  }

  return v2t[value]
}

/**
 *
 * @param {*} constant 常量
 */
export const constant2Array = function (constant) {
  const arr = []

  Object.keys(constant).forEach(key => {
    const it = constant[key]
    arr.push(it)
  })
  return arr
}
