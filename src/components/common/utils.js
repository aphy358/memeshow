export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value) {
  return /^\d+$/.test(value);
}

export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

let systemInfo = null;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}


export function throttle(func, wait) {
  wait = wait || 300

  return function () {
    var context = this;
    var args = arguments;

    if (!func.tId) {
      func.tId = setTimeout(() => {
        func.tId = null;
        func.apply(context, args)
      }, wait);
    }
  }
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