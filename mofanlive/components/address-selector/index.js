import address from '@/data/address'

Component({
  data: {
    addr: {
      list: [],
    },
    needAuth: false,
  },

  lifetimes: {
    ready() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.address']) {
            this.setData({
              needAuth: true
            })
          }
        }
      })

      this.init()
    },
  },

  methods: {

    /**
     * 初始化地址列表
     */
    init() {
      // TODO use real data
      this.setData({
        "addr.list": address
      })
    },

    wechatAddress() {
      if (this.data.needAuth) {
        wx.showModal({
          title: "需要打开小程序的设置重新授权",
          confirmText: "去设置",
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success: res => {
                  if (res.authSetting['scope.address']) {
                    this.setData({
                      needAuth: false
                    }, () => {
                      this.wechatAddress()
                    })
                  }
                }
              })
            }
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
          },
          fail: err => {
            this.setData({
              needAuth: true
            })
          }
        })
      }
    },

    editAddress(e) {
      const index = e.currentTarget.dataset.index
    },

    emitAddress(data) {
    },

    addAddress() {
      console.log('add')
      this.triggerEvent('add')
    },

    /**
     * 选择地址
     * @param {event} e 
     */
    selectAddress(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('change', this.data.addr.list[index])
    },

    setDefault(e) {
      const length = this.data.addr.list.length
      const index = e.detail.value
      for (let i = 0; i < length; i++) {
        this.setData({
          [`addr.list[${i}].isDefault`]: i === index && e.detail.checked
        })
      }
    },
  },

  options: {
    addGlobalClass: true
  }
})