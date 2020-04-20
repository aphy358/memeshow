Component({
  properties: {
    address: {
      type: Object,
      value: {}
    }
  },

  options: {
    addGlobalClass: true
  },

  methods: {
    copy() {
      const { address } = this.data
      const _address = address.address
      const { city, district, name, province, tel } = address

      wx.setClipboardData({
        data: name + ' ' + tel + ' ' + province + city + district + _address
      })
    }
  },
})