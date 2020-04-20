Component({
  properties: {
    isShow: {
      type: Boolean,
      value: !1
    },
    dialogHeight: {
      type: String,
      value: "74%"
    },
    dialogRaduis: {
      type: String,
      value: "32rpx"
    },
    isShowClose: {
      type: Boolean,
      value: !1
    },
    hideAnimation: {
      type: Boolean,
      value: !1
    },
    maskExtStyle: {
      type: String,
      value: ""
    }
  },

  methods: {
    closeDialog() {
      this.triggerEvent("closedialog", {})
    },
    emptyFn() {}
  }
})
