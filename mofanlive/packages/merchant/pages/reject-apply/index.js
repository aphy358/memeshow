import { connectPage } from "wx-redux"
const Api = wx.X.Api

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    refundId: null,

    // 类型 - 1：rejectApply（拒绝申请）， 2：rejectReturn（退货拒收）
    rejectType: null,

    reason: '',
  },

  onLoad: function ({ id, type }) {
    if (!!id) {
      this.setData({ 
        refundId: id,
        rejectType: type,
      })
    }

    if (type === '2') {   // 退货拒收
      wx.setNavigationBarTitle({
        title: '拒绝收货'
      })
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

  validateForm({ reason }) {

    if (!reason) {
      wx.showToast({
        title: "请填写拒绝理由",
        icon: "none"
      })
      return false
    }

    return true
  },

  onInputTextArea({ detail }) {
    this.setData({ reason: detail.value })
  },

  async handleSubmit({ detail }) {
    const { refundId, rejectType, reason } = this.data

    if (!this.validateForm({ reason }))  return false;

    if (rejectType === '1') {     // 拒绝申请
      await Api.MerchantRefund.reject({ refundId, reason })

    } else if (rejectType === '2') {    // 退货拒收
      await Api.MerchantRefund.rejectReturn({ refundId, reason })
    }

    wx.showToast({
      title: '申请已拒绝！',
      icon: 'none',
    });

    setTimeout(() => {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }, 500);
  },
 
}))