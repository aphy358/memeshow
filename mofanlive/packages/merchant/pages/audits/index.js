import { connectPage } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
const Api = wx.X.Api


const mapStateToProps = state => ({
  context: state.context,
  userProfile: state.userProfile,
})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    audits: [],

    refundId: null
  },

  watch: {
  },

  onLoad: function ({ id }) {
    if (!!id) {
      this.data.refundId = id
      this.fetchAudits()
    }
  },

  onReady: function () {
  },

  onShow: function () {
    // 如果是从下一个页面回到当前页面，则需要重新查询 audits
    const { audits } = this.data
    if (audits.length > 0) {
      this.fetchAudits()
    }
  },

  async fetchAudits() {
    const { userProfile, refundId, context } = this.data

    if (userProfile && refundId) {
      let audits = await Api.MerchantRefund.audits(refundId)

      console.log('audits', audits);
      this.setData({ audits })
    }
  },

}))