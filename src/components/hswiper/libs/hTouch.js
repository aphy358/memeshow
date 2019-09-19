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
    // 存储第一次触屏的事件 identifier，用于解决多个手指滑动的冲突
    this.alreadyTouched = undefined
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

    // 当前如果已经有手指在滑动屏幕了，则不再触发其他手指的滑动事件；而如果是第一次触摸屏幕的实体，则将相关参数保存起来
    if(this.alreadyTouched !== undefined){
      return
    }else{
      this.alreadyTouched = e.changedTouches[0].identifier
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

    // 如果第一次触摸屏幕的实体和正在当前正在屏幕上移动的实体不一致（比如第二个手指），则不触发屏幕移动
    if(this.alreadyTouched !== e.changedTouches[0].identifier) return

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

  touchend(e) {
    // 这里预先将 this.alreadyTouched 清空，因为在iPhone上，当从底部上滑调起控制台时会将 touchend 事件吃掉，从而导致 this.alreadyTouched 没有清空
    // 那么后续再怎么滑动屏幕都没有反应，造成假死现象。而如果在这个时机提供清空的机制，则可以通过多次滑动屏幕而重新激活该列表滚动
    let alreadyTouched = this.alreadyTouched
    this.alreadyTouched = undefined

    if(!e.changedTouches[0] || this.disableMove)  return

    // 如果第一次触摸屏幕的实体和正在当前正在屏幕上移动的实体不一致（比如第二个手指），则不触发屏幕移动
    if(alreadyTouched !== e.changedTouches[0].identifier) return
    
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
    this.emit('touchend', touchObj)
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
}

export default HTouch
