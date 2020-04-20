Component({
  externalClasses: ["drawer-class"],
  properties: {
    // 背景阴影
    mask: {
      type: Boolean,
      value: true,
    },

    // 是否开启
    open: {
      type: Boolean,
      value: false,
    },

    // 弹出速度 ms
    duration: {
      type: Number,
      value: 250
    }
  },

  data: {
    _progress: false
  },

  methods: {
    onTapMask() {
      this.onClose()
    },

    onClose() {
      if (this.data._progress) return
      this.data._progress = true
      this.triggerEvent(
        "close",
        null,
        {
          "composed": true,
          "bubbles": true
        }
      )
      this.setData({ open: false }, () => {
        setTimeout(() => (this.data._progress = false), this.data.duration)
      })
    },

    // 阻止 touch move 事件穿透
    onPreventDefault(e) { }
  }
})