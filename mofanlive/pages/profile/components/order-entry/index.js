Component({
  properties: {
    entry: {
      type: Object,
      value: []
    }
  },

  methods: {
    navToOrders(e) {
      const type = e.currentTarget.dataset.type
      wx.navigateTo({
        url: `/pages/orders/index?type=${type}`,
        fail(err) {
          console.error(err)
        }
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})