import { connectPage } from "wx-redux"
const Api = wx.X.Api


const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    orderId: null,

    content: '',
  },

  onLoad: function ({ id }) {
    if (!!id) {
      this.setData({ orderId: id })
    }
  },

  onInputTextArea({ detail }) {
    this.setData({ content: detail.value })
  },

  validateForm({ content }) {

    if (!content) {
      wx.showToast({
        title: "请填写备注",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { orderId, content } = this.data

    if (!this.validateForm({ content }))  return false;
    await Api.MerchantOrder.remark({ orderId, content })

    wx.showToast({
      title: '备注成功！',
      icon: 'none',
    });

    setTimeout(() => {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }, 500);
  },
 
}))