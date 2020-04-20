Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: "apply-shared"
  },

  properties: {},

  data: {},

  methods: {
    onContact(e) {},
    switchToMerchant() {
      this.triggerEvent("switchrole", {})
    }
  },

  lifetimes: {
    ready() {},
    attached() {},
    detached() {}
  }
})
