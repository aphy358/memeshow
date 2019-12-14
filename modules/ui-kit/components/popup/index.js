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

    title: {
      type: String,
      value: ""
    }
  },

  methods: {
    onTapMask() {
      if (!this.data.maskClosable) return
      else this.onClose()
    },

    onClose() {
      this.setData({ open: false })
      this.triggerEvent("close")
    },

    // 阻止 touch move 事件穿透
    onPreventDefault(e) {}
  },

  options: {
    multipleSlots: true
  }
})
