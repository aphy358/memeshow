
export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isNumber(value) {
  return /^\d+$/.test(value);
}

export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}

/**
 * 构建动画实例
 * @param {*} animateOpt 由多个动画属性组成的对象
 * @param {*} duration 动画时长
 * @param {*} timingFunction 动画过渡方式
 */
export function animateTo(
  animateOpt = {},
  duration = 300,
  timingFunction = 'ease-out'
){
  let animate = wx.createAnimation({
    transformOrigin: '50% 50%',
    duration: duration,
    timingFunction: timingFunction,
    delay: 0
  })

  for (const key in animateOpt) {
    if (animateOpt.hasOwnProperty(key)) {
      const animateVal = animateOpt[key];
      animate[key](animateVal)
    }
  }

  return animate.step().export()
}


/**
 * 数组长度限制器
 * 
 * @param {*} dataList 目标数组
 * @param {*} limitLen 数组允许的最大长度
 * @param {*} isFromHead 是否从数组头部开始截取，true：从头部开始截取，false：从尾部截取
 */
export const arrayLenthLimit = (dataList, limitLen = 50, isFromHead = false) => {
  if(dataList.length > limitLen){
    // 如果 isFromHead 为数字类型，则以该数字作为起始下标开始截取
    if(typeof isFromHead === 'number'){
      return dataList.slice(isFromHead, limitLen + isFromHead)
    }

    let tmpList = !!isFromHead
      ? dataList.slice(0, limitLen)
      : dataList.slice(-limitLen)
    
    return tmpList
  }

  return dataList
}