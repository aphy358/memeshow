Component({
  properties: {
    deliveryName: {
      type: String,
      value: ''
    }
  },

  methods: {
    navToDeliveryDetail() {
      wx.navigateTo({
        url: "/pages/delivery/index?id=delivery1"
      })
    },
  },

  options: {
    addGlobalClass: true
  }
})