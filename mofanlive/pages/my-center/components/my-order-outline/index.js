import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})
Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {
    unpaid: 0,
    undeliver: 0,
    delivered: 0,
    refund: 0,
  },

  methods: {
    async updateCount() {
      const count = await wx.X.Api.Order.count()
      this.setData({
        unpaid: count.toPay,
        undeliver: count.paid,
        delivered: count.sent,
        refund: count.refund,
      })
    }
  },

  lifetimes: {
    ready() {
    },
    attached() {
    },
    detached() {
    }
  },
}))
