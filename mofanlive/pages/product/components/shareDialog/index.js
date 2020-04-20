Component({
  properties: {
    // product 需要的内购券
    vouchercount: {
      type: Number,
      value: 10
    },

    // 已领的内购券
    count: {
      type: Number,
      value: 5
    }
  },
  data: {
    closeImg:
      "https://pinduoduoimg.yangkeduo.com/wxappimg/neigou4/closeimgbig.png"
  },
  methods: {
    onClose() {
      this.triggerEvent("close", {})
    }
  }
})
