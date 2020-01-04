Component({
  properties: {
    open: {
      type: Boolean,
      value: false
    },

    // 是否有蒙层
    mask: {
      type: Boolean,
      value: true
    },

    // 点击蒙层是否允许关闭
    maskClosable: {
      type: Boolean,
      value: true
    },

    // 是否显示右上角关闭按钮
    closable: {
      type: Boolean,
      value: false
    },

    // 动画的持续时间，单位 ms
    duration: {
      type: Number,
      value: 500
    },

    title: {
      type: String,
      value: ""
    },

    // 自定义 content 区域的样式
    contentStyle: {
      type: String,
      value: ""
    },

    height: String
  },

  externalClasses: ["popup-content", "popup-body"],

  data: {
    _progress: false
  },

  methods: {
    onTapMask() {
      if (!this.data.maskClosable) return
      else this.onClose()
    },

    onClose() {
      if (this.data._progress) return
      this.data._progress = true
      this.triggerEvent("close")
      this.setData({ open: false }, () => {
        setTimeout(() => (this.data._progress = false), this.data.duration)
      })
    },

    // 阻止 touch move 事件穿透
    onPreventDefault(e) {}
  },

  options: {
    multipleSlots: true,
    pureDataPattern: /^_/
  }
})
