Component({
  properties: {
    product: {
      type: Object,
      value: {}
    }
  },

  methods: {
    navToProduct() {
      wx.navigateTo({
        url: "/pages/product/index"
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})