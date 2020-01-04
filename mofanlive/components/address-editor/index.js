import { safeArea } from 'ui-kit/behaviors/safeArea'

Component({
  data: {
    name: "",
    tel: "",
    region: ['', '', ''],
    address: "",
    postCode: ''
  },

  methods: {
    init(addr) {
      console.log(addr)
      this.setData({
        name: addr.name,
        tel: addr.tel,
        address: addr.address,
        region: [addr.province, addr.city, addr.district]
      })
    },

    handleRegionChange(e) {
      this.setData({
        region: e.detail.value
      })
    },

    submit(e) {
      console.log(e)
      const formData = e.detail.value
      const region = this.data.region
      formData.province = region[0]
      formData.city = region[1]
      formData.district = region[2]
      if (!this.canSubmit(formData)) {
        wx.showToast({
          title: '请填写完整信息', //提示的内容,
          icon: 'none', //图标,
          duration: 1000, //延迟时间,
          mask: false, //显示透明蒙层，防止触摸穿透,
          success: res => { }
        });
      }
    },

    canSubmit(form) {
      return (
        form.name && form.address && form.tel && form.province && form.city && form.district
      )
    },

    cancel() {
      this.triggerEvent('cancel')
    }
  },

  behaviors: [safeArea()],
  options: {
    addGlobalClass: true
  },

  // chooseWechatAddress() {
  //   wx.getSetting({
  //     success: (res) => {
  //       if (!res.authSetting['scope.address']) {
  //         wx.authorize({
  //           scope: 'scope.address',
  //           success: () => {
  //             this.chooseWechatAddress()
  //           }
  //         })
  //       } else {
  //         wx.chooseAddress({
  //           success: (res) => {
  //             this.setData({
  //               name: res.userName,
  //               tel: res.telNumber,
  //               region: [res.provinceName, res.cityName, res.countyName],
  //               address: res.detailInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
})