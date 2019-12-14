const procedures = wx.X.procedures
Page({
  data: {
    name: "",
    tel: "",
    region: ['', '', ''],
    address: "",
    isDefault: false,

    sid: ""
  },

  onLoad(options) {
    this.data.sid = options.sid
    procedures.get(this.data.sid).asProcedure().on('edit', this.init)
  },

  init(addr) {
    this.setData({
      name: addr.name,
      tel: addr.tel,
      address: addr.address,
      region: [addr.province, addr.city, addr.district]
    })
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.register(this)
    }
  },

  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  submit(e) {
    console.log(e)
    const formData = e.detail.value
    formData.region = this.data.region
    if (!this.canSubmit(formData)) {
      wx.showToast({
        title: '请填写完整信息', //提示的内容,
        icon: 'none', //图标,
        duration: 1000, //延迟时间,
        mask: false, //显示透明蒙层，防止触摸穿透,
        success: res => { }
      });
    }

    // TODO post to server
    this.emitAddress(formData)
    wx.navigateBack({ delta: 1 })
  },

  canSubmit(form) {
    return (
      form.name && form.address && form.tel && form.region[0] && form.region[1] && form.region[2]
    )
  },

  chooseWechatAddress() {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success: () => {
              this.chooseWechatAddress()
            }
          })
        } else {
          wx.chooseAddress({
            success: (res) => {
              this.setData({
                name: res.userName,
                tel: res.telNumber,
                region: [res.provinceName, res.cityName, res.countyName],
                address: res.detailInfo
              })
            }
          })
        }
      }
    })
  },

  emitAddress(addr) {
    const emitter = procedures.get(this.data.sid).asProcedure()
    emitter.emit('address', addr)
    emitter.emit('complete', addr)
  }
})