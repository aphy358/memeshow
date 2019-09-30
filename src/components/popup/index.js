/**
 * Popup component
 *
 * @event Popup#blur
 * @event Popup#Leaved
 */

const nextTick = () => new Promise(resolve => setTimeout(resolve, 30))

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },

    /**
     * 弹出层的位置
     * `top`, `bottom`, `left`, `right`, `center`
     */

    position: {
      type: String,
      value: "center"
    },

    /**
     * 动画类型
     * `fade`, `slide`
     */

    type: {
      type: String,
      value: "fade"
    },

    /**
     * 动画持续时间
     * 单位：`ms`
     */

    duration: {
      type: [Object, Number],
      value: 500
    },

    zIndex: {
      type: Number,
      value: 1
    },

    mask: {
      type: Boolean,
      value: true
    }
  },

  data: {
    classes: "",
    display: false
  },

  observers: {
    show: function(signal) {
      return signal ? this.enter() : this.leave()
    }
  },

  methods: {
    /**
     * 封装好动画的类
     * @param {string} type
     */

    getClassNames() {
      const {type, position} = this.data
      return {
        enter: `${type}-${position}-enter ${type}-${position}-enter-active enter-class enter-active-class`,
        "enter-to": `${type}-${position}-enter-to ${type}-${position}-enter-active enter-to-class enter-active-class`,
        leave: `${type}-${position}-leave ${type}-${position}-leave-active leave-class leave-active-class`,
        "leave-to": `${type}-${position}-leave-to ${type}-${position}-leave-active leave-to-class leave-active-class`
      }
    },

    /**
     * 进场动画
     */

    enter() {
      const { duration, type } = this.data
      const classNames = this.getClassNames()
      const currentDuration =
        typeof duration === "object" ? duration.enter : duration
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.setData({
            display: true,
            classes: classNames.enter,
            currentDuration
          })
        })
        .then(nextTick)
        .then(() => {
          this.setData({
            classes: classNames["enter-to"]
          })
        })
        .catch(e => console.error(e))
    },

    /**
     * 退场动画
     */

    leave() {
      const { duration, type } = this.data
      const classNames = this.getClassNames()
      const currentDuration =
        typeof duration === "object" ? duration.leave : duration
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.setData({
            classes: classNames.leave,
            currentDuration
          })
        })
        .then(() => setTimeout(() => this.onTransitionEnd(), currentDuration))
        .then(nextTick)
        .then(() => {
          this.setData({
            classes: classNames["leave-to"]
          })
        })
        .catch(() => {})
    },

    /**
     * 每次动作结束时触发
     */

    onTransitionEnd() {
      if (!this.data.show) {
        this.setData({ display: false })
        this._emitLeave()
      }
    },

    /**
     * 点击非内容区域
     */

    onBlur() {
      this._emitBlur()
    },

    _emitBlur() {
      this.triggerEvent("blur")
    },

    _emitLeave() {
      this.triggerEvent("leaved")
    }
  }
})
