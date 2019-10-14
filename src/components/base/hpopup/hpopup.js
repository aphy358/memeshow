
import { GLOBAL } from '../../common/utils'
const NEXT_TICK = () => new Promise(resolve => setTimeout(resolve, 30))
const MASK_CLASS_NAMES = {
  "enter": `mask-enter mask-enter-active`,
  "enter-to": `mask-enter-to mask-enter-active`,
  "leave": `mask-leave mask-leave-active`,
  "leave-to": `mask-leave-to mask-leave-active`
}


Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (!this.data.initialized) return;
        this.data.transforming = true
        return newVal ? this.enter() : this.leave()
      }
    },

    // 用户自定义动画
    customAnimation: {
      type: Object,
      value: null
    },

    // 弹出层的位置：`top`, `bottom`, `left`, `right`, `center`
    position: {
      type: String,
      value: "center"
    },

    // 动画类型：`fade`, `slide`
    animateType: {
      type: String,
      value: "slide"
    },

    // 动画持续时间：单位：`ms`
    duration: {
      type: [Object, Number],
      value: 300
    },

    mask: {
      type: Boolean,
      value: true
    }
  },

  data: {
    // 设置弹层的 z-index
    zIndex: GLOBAL.mofanshow.popupZIndex,

    currentDuration: 300,

    // 是否正在动画中
    transforming: false,

    // 是否已经初始化
    initialized: false,

    popupBodyClasses: "",

    popupMaskClasses: "",

    // 用于控制 popup 的显示和隐藏
    wrapStyle: 'visibility:hidden;'
  },

  methods: {
    initialize(){
      const { customAnimation } = this.data

      // 初始化 popup 显示状态
      this.setData({ 
        initialized: true,
        wrapStyle: customAnimation ? 'visibility:hidden;' : 'display:none;',
      })
      this.triggerEvent('initialized')
    },

    // 获取类名
    getClassNames() {
      const { animateType, position } = this.data
      return {
        "enter": `${animateType}-${position}-enter ${animateType}-${position}-enter-active popup-enter popup-enter-active`,
        "enter-to": `${animateType}-${position}-enter-to ${animateType}-${position}-enter-active popup-enter-to popup-enter-active`,
        "leave": `${animateType}-${position}-leave ${animateType}-${position}-leave-active popup-leave popup-leave-active`,
        "leave-to": `${animateType}-${position}-leave-to ${animateType}-${position}-leave-active popup-leave-to popup-leave-active`
      }
    },

    // 进场动画
    enter() {
      const { duration, customAnimation } = this.data
      const classNames = this.getClassNames()
      const currentDuration =
        typeof duration === "object" ? duration.enter : duration

      Promise.resolve()
        .then(() => {
          this.setData({
            wrapStyle: customAnimation ? 'visibility:visible;' : 'display:block;',
            popupBodyClasses: classNames.enter,
            popupMaskClasses: MASK_CLASS_NAMES['enter'],
            currentDuration
          })
        })
        .then(NEXT_TICK)
        .then(() => setTimeout(() => this.onTransitionEnd('enter'), currentDuration))
        .then(() => {
          this.setData({
            popupBodyClasses: classNames["enter-to"],
            popupMaskClasses: MASK_CLASS_NAMES["enter-to"],
          })
        })
        .catch(e => console.error(e))

      // 显示弹窗，则当前所有弹窗最大 z-index 值加1，并且当前已显示弹窗的数量加1
      ++GLOBAL.mofanshow.popupCount
      ++GLOBAL.mofanshow.popupZIndex
      this.setData({ zIndex: GLOBAL.mofanshow.popupZIndex })
    },

    // 退场动画
    leave() {
      const { duration } = this.data
      const classNames = this.getClassNames()
      const currentDuration =
        typeof duration === "object" ? duration.leave : duration

      Promise.resolve()
        .then(() => {
          this.setData({
            popupBodyClasses: classNames.leave,
            popupMaskClasses: MASK_CLASS_NAMES['enter'],
            currentDuration
          })
        })
        .then(NEXT_TICK)
        .then(() => setTimeout(() => this.onTransitionEnd('leave'), currentDuration))
        .then(() => {
          this.setData({
            popupBodyClasses: classNames["leave-to"],
            popupMaskClasses: MASK_CLASS_NAMES["leave-to"],
          })
        })
        .catch(e => console.error(e))

      // 隐藏弹窗，则当前已显示弹窗的数量减1，并且如果当前已显示的弹窗总数为0，则将当前所有弹窗最大 z-index 值设置为9000
      --GLOBAL.mofanshow.popupCount
    },

    /**
     * 每次动画结束时触发
     * @param {*} eventType 'leave' / 'enter'
     */
    onTransitionEnd(eventType) {
      const { customAnimation, show } = this.data
      if (!show) {
        this.setData({
          wrapStyle: customAnimation ? 'visibility:hidden;' : 'display:none;'
        })
      }

      // 键盘收起来的速度很慢，所以这里的值设的大一点，确保在键盘收起来之后再将 transforming 的值设为 false
      setTimeout(() => {
        this.data.transforming = false
      }, 300);

      this.triggerEvent(eventType)
    },

    // 点击了遮罩层
    tapMask(){
      let { transforming } = this.data
      if(!transforming){
        this.triggerEvent('tapMask', {})
      }
    },

    // 遮罩层的 touchend 事件
    touchendMask(){
      let { transforming } = this.data
      if(!transforming){
        this.triggerEvent('touchendMask', {})
      }
    }
  },

  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
