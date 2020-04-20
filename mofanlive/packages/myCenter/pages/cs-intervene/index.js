import { connectPage } from "wx-redux"
const Api = wx.X.Api

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    // 上传的凭证
    proof: [],

    refundId: null,
  },

  onLoad: function ({ id }) {
    if (!!id) {
      this.data.refundId = id
    }
  },

  onReady: function () {
  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  validateForm({
    reason
  }) {

    if (!reason) {
      wx.showToast({
        title: "请输入申请理由",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { proof } = this.data
    const { reason } = detail.value

    const params = {
      id: this.data.refundId,
      reason: reason,
      enclosures: proof
    }

    if (!this.validateForm(params))  return false;

    await Api.Refund.adminInvolve(params)

    wx.navigateBack({
      delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
    });
  },

  // 上传图片的回调函数
  handleProofChange({ detail }) {
    this.data.proof = detail
  }
 
}))