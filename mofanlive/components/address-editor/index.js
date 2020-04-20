import { safeArea } from 'ui-kit/behaviors/safeArea'

const Api = wx.X.Api

Component({
  data: {
    name: "",
    tel: "",
    region: ['', '', ''],
    address: "",
    postCode: '',
    id: '',
    isDefault: false,
  },

  methods: {
    init(addr) {
      this.setData({
        name: addr.name,
        tel: addr.tel,
        address: addr.address,
        region: [addr.province, addr.city, addr.district],
        postCode: addr.postCode,
        id: addr.id,
        isDefault: addr.isDefault || false,
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
          icon: 'none',
          mask: false,
        });
      } else {
        if (!!this.data.id) {
          this.update(formData)
        } else {
          this.create(formData)
        }
      }
    },

    canSubmit(form) {
      return (
        form.name && form.address && form.tel && form.province && form.city && form.district
      )
    },

    cancel() {
      this.setData({
        name: '',
        tel: '',
        address: '',
        region: ['', '', ''],
        postCode: '',
        id: '',
        isDefault: false,
      })
      this.triggerEvent('cancel')
    },

    async update(data) {
      const rsp = await Api.UserProfile.updateAddress({
        ...data,
        id: this.data.id,
      })
      if (!!rsp) {
        this.cancel()
      }
    },

    async create(data) {
      const rsp = await Api.UserProfile.createAddress(data)
      if (data.isDefault) {
        await Api.UserProfile.updateAddress({
          ...rsp,
          isDefault: true,
        })
      }
      if (!!rsp) {
        this.cancel()
      }
    }
  },

  behaviors: [safeArea()],
  options: {
    addGlobalClass: true
  },
})