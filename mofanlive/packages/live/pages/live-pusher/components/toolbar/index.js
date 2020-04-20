Component({
  properties: {
    productCount: {
      type: Number,
      value: 0
    },

    currentProduct: {
      type: Object,
      value: null
    },

    // 直播间的设置
    settings: {
      type: Object,
      value: {
        mode: "FHD",
        enableCamera: true,
        devicePosition: "front",
        enableMic: true,
        mirror: false,
        beauty: false
      }
    },

    showShareTips: {
      type: Boolean,
      value: true
    }
  },

  data: {
    popover: "",
  },

  lifetimes: {
    ready() {
      setTimeout(() => this.onTapShare(), 3000)
    }
  },

  methods: {
    onClickBag() {
      this.triggerEvent("bag", {}, {})
    },

    onClickShop() {
      this.triggerEvent("shop", {}, {})
    },

    onChangeSettings() {
      this.onTapShare()
      this.setData({
        popover: this.data.popover == "setting" ? "" : "setting"
      })
    },

    onTapShare() {
      this.setData({
        showShareTips: false
      })
    },

    // 改变清晰度
    onChangeMode() {
      const { settings } = this.data
      this.triggerEvent("change", {
        type: "mode",
        value: settings.mode === "SD" ? "FHD" : "SD"
      })
    },

    // 改变摄像头
    onChangeCamera() {
      const { settings } = this.data
      this.triggerEvent("change", {
        type: "devicePosition",
        value: settings.devicePosition === "front" ? "back" : "front"
      })
    },

    // 改变镜像
    onChangeMirror() {
      const { settings } = this.data
      this.triggerEvent("change", {
        type: "mirror",
        value: !settings.mirror
      })
    },

    // 美颜
    onChangeBeauty() {
      const { settings } = this.data
      this.triggerEvent("change", {
        type: "beauty",
        value: !settings.beauty
      })
    },

    // 改变麦克风
    onChangeMic() {
      const { settings } = this.data
      this.triggerEvent("change", {
        type: "enableMic",
        value: !settings.enableMic
      })
    }

  }
})
