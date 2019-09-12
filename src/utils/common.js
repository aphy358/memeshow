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

/**
 * 时间戳转换 刚刚 几分钟前 几小时前 几天前 日月
 */
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
export const timeFormat = (timestamps) => {
  timestamps = timestamps * 1000
  let daySec, dayMin, dayHour, dayS
  let timeNow = new Date().getTime()
  let ts = (timeNow - timestamps) / 1000
  dayS = Math.round(ts / (24 * 60 * 60))
  dayHour = Math.round(ts / (60 * 60))
  dayMin = Math.round(ts / 60)
  daySec = Math.round(ts)
  if (dayS > 0 && dayS < 5) {
    return `${dayS} 天以前`
  } else if (dayS <= 0 && dayHour > 0) {
    return `${dayHour} 小时以前`
  } else if (dayHour <= 0 && dayMin > 0) {
    return `${dayMin} 分钟以前`
  } else if (dayMin <= 0 && daySec >= 0) {
    return '刚刚'
  } else {
    let timestamp = new Date()
    timestamp.setTime(timestamps)
    return [timestamp.getMonth() + 1, timestamp.getDate()].map(this.formatNumber).join('-')
  }
}
/**
 * 数据 万进制转换 number
 */
export const numberFormat = (number) => {
  let num;
  if (typeof number != 'number') {
    num = parseInt(number);
  } else {
    num = number;
  }
  let length = String(num).length;
  if (length > 4) {
    return `${Math.round(((num / 10000).toFixed(2)) * 10) / 10}w`
  } else {
    return num;
  }
}