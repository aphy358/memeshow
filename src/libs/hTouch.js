/**
 * 小程序touch 扩展包
 */
import HEvent from './hEvent'
// 每次滑动相对于上次滑动的间隔限制
const SWIPER_DUARATION = 300

class HTouch extends HEvent {
  constructor() {
    super()
    this.startX = 0
    this.startY = 0
    this.endX = 0
    this.endY = 0
    this.moveDistanceX = 0
    this.moveDistanceY = 0

    this.startTime = 0
    this.endTime = 0
    // 用于标记当前是否允许滑动屏幕
    this.disableMove = false
  }

  touchstart(e) {
    if(!e.changedTouches[0])  return

    // 如果当前时间戳和上一次 touchend 时记录的时间戳间隔小于设定的值，则不允许滑动屏幕（用于限制用户过于快速而频繁的滑动屏幕而导致异常）
    if(e.timeStamp - this.endTime < SWIPER_DUARATION){
      this.disableMove = true
      return
    }else{
      this.disableMove = false
    }

    this.startX = e.changedTouches[0].clientX
    this.startY = e.changedTouches[0].clientY
    this.touchTime = e.timeStamp
    let touchObj = {
      startTime: this.touchTime,
      endTime: e.timeStamp,
      startX: this.startX,
      startY: this.startY,
    }

    let type = 'touchstart'
    touchObj.type = type
    this.emit(type, touchObj)
  }

  touchmove(e) {
    if(!e.changedTouches[0] || this.disableMove)  return

    this.endX = e.changedTouches[0].clientX
    this.endY = e.changedTouches[0].clientY
    const times = e.timeStamp - this.touchTime
    const distanceX = e.changedTouches[0].clientX - this.startX
    const distanceY = e.changedTouches[0].clientY - this.startY

    this.moveDistanceX = this.endX - this.startX
    this.moveDistanceY = this.endY - this.startY

    let touchObj = {
      distanceX,
      distanceY,
      startTime: this.touchTime,
      endTime: e.timeStamp,
      duration: times,
      startX: this.startX,
      endX: e.changedTouches[0].clientX,
      startY: this.startY,
      endY: e.changedTouches[0].clientY
    }

    let type = 'touchmove'
    touchObj.type = type
    this.emit(type, touchObj)
  }

  touchend(e, eventType = 'touchend') {
    if(!e.changedTouches[0] || this.disableMove)  return

    const times = e.timeStamp - this.touchTime
    const distanceX = e.changedTouches[0].clientX - this.startX
    const distanceY = e.changedTouches[0].clientY - this.startY

    this.moveDistanceY = distanceY
    this.moveDistanceX = distanceX
    this.endTime = e.timeStamp

    if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10) {
      return
    }

    let touchObj = {
      distanceX,
      distanceY,
      startTime: this.touchTime,
      endTime: e.timeStamp,
      duration: times,
      startX: this.startX,
      endX: e.changedTouches[0].clientX,
      startY: this.startY,
      endY: e.changedTouches[0].clientY
    }
    this.emit(eventType, touchObj)
    let type = ''
    /* 确定是垂直 */
    if ((Math.abs(distanceY) - Math.abs(distanceX)) > 0) {
      if (distanceY > 0) {
        type = 'touchdown'
      } else {
        type = 'touchup'
      }
    } else if (distanceX > 0) {
      type = 'touchright'
    } else {
      type = 'touchleft'
    }
    touchObj.type = type
    this.emit(type, touchObj)
  }

  touchcancel(e) {
    this.touchend(e, 'touchcancel')
  }
}

export default HTouch
