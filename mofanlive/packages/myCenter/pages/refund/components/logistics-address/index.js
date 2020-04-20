import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    refundDetail: {
      type: Object,
      value: {}
    }
  },

  data: {
  },

  methods: {
    copyAdress() {
      const { returnAddress: { name, tel, province, city, district, address } } = this.data.refundDetail
      wx.setClipboardData({
        data: name + ' ' + tel + ' ' + province + city + district + address
      })
    }
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))