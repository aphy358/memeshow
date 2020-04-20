import { connectPage } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
const Api = wx.X.Api


const mapStateToProps = state => ({ 
  userProfile: state.userProfile,
  order: state.merchantOrders.thatOrder,
})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    // 关闭订单原因
    cancelReason: {
      selected: "",
      value: -1,
      range: ['无法联系上买家', '买家误拍或重拍了', '缺货', '其他原因'],
    },

    refundId: null
  },

  watch: {
    userProfile(newVal, oldVal) {
      if (newVal && newVal.id) {
      }
    },
  },

  onLoad: function ({ id }) {
    if (!!id) {
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

  handleCancelReasonChange({ detail }) {
    this.setData({
      "cancelReason.selected": this.data.cancelReason.range[detail.value],
      "cancelReason.value": Number(detail.value) + 1,
    })
  },

  validateForm({
    reason,
  }) {

    if (!reason) {
      wx.showToast({
        title: "请选择关闭理由",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { order, cancelReason } = this.data

    const params = {
      orderId: order.id,
      reason: cancelReason.selected,
    }

    if (!this.validateForm(params))  return false;

    wx.showModal({
      content: '确定关闭订单？',
      success: async function (res) {
        if (res.confirm) {
          await Api.MerchantOrder.cancel(params)
  
          wx.showToast({
            title: '订单已关闭！',
            icon: 'none',
          });
  
          setTimeout(() => {
            wx.navigateBack({
              delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          }, 500);
        }
      },
      fail: function (res) { }
    })
  },
 
}))