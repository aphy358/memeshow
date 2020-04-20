const router = wx.X.router
Component({
  properties: {
    product: Object,

    needs: Number,

    shareInfo: {
      type: String,
      value: ""
    }
  },

  methods: {
    onClose() {
      this.triggerEvent("close")
    },

    gobuy() {
      router.go("product", { id: this.data.product.id })
    }
  }
})
