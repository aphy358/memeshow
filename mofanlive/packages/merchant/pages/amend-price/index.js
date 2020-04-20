import { connectPage } from "wx-redux"
import computedBehavior from 'miniprogram-computed'

const Api = wx.X.Api

const mapStateToProps = state => ({ 
  order: state.merchantOrders.thatOrder,
})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    postage: 0,
    adjustAmount: 0,
    totalAount: 0,
  },

  watch: {
    'postage,adjustAmount': function() {
      const { postage, adjustAmount } = this.data
      this.setData({ totalAount: postage + adjustAmount })
    }
  },

  onLoad: function (options) {
  },

  inputAdjustAmount({ detail }) {
    this.setData({ adjustAmount: +detail.value })
  },

  inputPostage({ detail }) {
    this.setData({ postage: +detail.value })
  },

  validateForm({ adjustAmount, postage }) {

    if (typeof adjustAmount !== 'number') {
      wx.showToast({
        title: "请正确输入现价",
        icon: "none"
      })
      return false
    }

    if (typeof postage !== 'number') {
      wx.showToast({
        title: "请正确输入运费",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail: { value: { adjustAmount, postage } } }) {
    const { order } = this.data
    adjustAmount = Number(adjustAmount) * 100
    postage = Number(postage) * 100

    if (!this.validateForm({ adjustAmount, postage }))  return false;
    await Api.MerchantOrder.adjustAmount({ id: order.id, amount: adjustAmount, postage: postage })
    
    wx.showToast({
      title: '价格已修改！',
      icon: 'none',
    });

    setTimeout(() => {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }, 500);
  },
 
}))