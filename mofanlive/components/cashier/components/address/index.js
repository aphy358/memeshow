const Api = wx.X.Api

Component({
  properties: {
    addr: {
      type: Object,
      value: {}
    }
  },

  methods: {
    /**
      selectAddress() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: "scope.address",
              success: response => {
                this.selectAddress()
              },
              fail: () => {
                this.openAddressSeletor()
              }
            })
          } else {
            wx.chooseAddress({
              success: async res => {
                const addr = {
                  name: res.userName,
                  tel: res.telNumber,
                  province: res.provinceName,
                  city: res.cityName,
                  district: res.countyName,
                  address: res.detailInfo,
                  isDefault: true,
                }

                const rsp = await Api.UserProfile.createAddress(addr)
                if (!!rsp.id) {
                  this.triggerEvent('change', rsp)
                }
              }
            })
          }
        }
      })
    },
    **/

    openAddressSelector() {
      const instance = wx.X.procedures.open("address-selector")
      instance.asCaller().on("complete", (addr) => {
        this.triggerEvent('change', addr)
      })
    }
  },

  options: {
    addGlobalClass: true,
  },
})