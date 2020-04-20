Component({
  properties: {
    open: Boolean,

    // 说明文字
    tips: {
      tyupe: String,
      value: ""
    },

    // 内容
    content: String,

    showCancel: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onCancel() {
      this.triggerEvent("cancel")
    },

    onConfirm() {
      this.triggerEvent("confirm")
    }
  }
})
