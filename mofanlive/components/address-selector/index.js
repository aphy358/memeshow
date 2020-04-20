const Api = wx.X.Api

/**
 * @event change
 * @event openeditor
 */
Component({
  data: {
    addr: {
      list: [],
    },
    needAuth: false,
  },

  methods: {
    /**
     * 初始化地址列表
     */
    init() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.address']) {
            this.setData({
              needAuth: true
            })
          }
        }
      })
      this.updateAddressList()
    },

    async updateAddressList() {
      const addressRsp = await Api.UserProfile.listAddress()
      this.setData({
        "addr.list": addressRsp
      })
    },

    async wechatAddress() {
      const res = await this.chooseAddress()
      if (!!res) {
        const rsp = await Api.UserProfile.createAddress(res)
        if (!!rsp) {
          rsp.isDefault = true
          await Api.UserProfile.updateAddress(rsp)
          this.updateAddressList()
        }
      }
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
      }
    },

    chooseAddress() {
      return new Promise((resolve, reject) => {
        wx.chooseAddress({
          success: res => {
            this.data.needAuth = false
            resolve({
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
              needAuth: err.errMsg != "chooseAddress:fail cancel"
            }, () => {
              resolve(false)
            })
          }
        })
      })
    },

    editAddress(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('openeditor', {
        preset: this.data.addr.list[index]
      })
    },

    addAddress() {
      this.triggerEvent('openeditor')
    },

    async deleteAddress(e) {
      const index = e.currentTarget.dataset.index
      const rsp = await Api.UserProfile.deleteAddress(this.data.addr.list[index].id)
      if (!!rsp) {
        this.updateAddressList()
        wx.showToast({
          title: "删除成功",
        })
      } else {
        wx.showToast({
          title: "删除失败，请稍后重试",
          icon: "none"
        })
      }
    },

    /**
     * 选择地址
     * @param {event} e 
     */
    selectAddress(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('change', this.data.addr.list[index])
    },

    async setDefault(e) {
      const list = this.data.addr.list
      const length = list.length
      const index = e.detail.value

      const address = list[index]
      address.isDefault = true

      wx.showLoading()
      const rsp = await Api.UserProfile.updateAddress(address)
      wx.hideLoading()
      if (!!rsp) {
        for (let i = 0; i < length; i++) {
          this.setData({
            [`addr.list[${i}].isDefault`]: i === index && e.detail.checked
          })
        }
      } else {
        wx.showToast({
          title: "设置默认地址失败",
          icon: "none",
        })
      }
    },
  },

  options: {
    addGlobalClass: true
  }
})