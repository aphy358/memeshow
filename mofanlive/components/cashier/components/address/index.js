Component({
  properties: {
    addr: {
      type: Object,
      value: {}
    }
  },

  methods: {
    selectAddress() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: "scope.address",
              success: res => {
                console.log(res)
                this.selectAddress()
              },
              fail: () => {
                console.log('emit')
                this.triggerEvent('address', {}, { bubbles: true, composed: true })
              }
            })
          } else {
            wx.chooseAddress({
              success: res => {
                this.emitAddress({
                  name: res.userName,
                  tel: res.telNumber,
                  province: res.provinceName,
                  city: res.cityName,
                  district: res.countyName,
                  address: res.detailInfo,
                })
                // TODO: upload to server
              }
            })
          }
        }
      })
    },

    emitAddress(addr) {
      this.triggerEvent('change', addr)
    },
  },

  lifetimes: {
    ready() {
      // this.init()
    }
  },

  options: {
    addGlobalClass: true,
  },
})