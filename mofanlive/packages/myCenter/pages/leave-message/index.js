import { connectPage } from "wx-redux"
const Api = wx.X.Api

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    // 上传的凭证
    enclosures: [],

    refundId: null,

    message: '',
  },

  onLoad: function ({ id }) {
    if (!!id) {
      this.data.refundId = id
    }
  },

  onReady: function () {
  },

  onInputTextArea({ detail }) {
    this.setData({ message: detail.value })
  },

  validateForm({
    remark
  }) {

    if (!remark) {
      wx.showToast({
        title: "请输入留言",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { enclosures, refundId, message } = this.data

    const params = {
      refundId,
      remark: message,
      enclosures
    }

    if (!this.validateForm(params))  return false;

    await Api.Refund.remarkAudit(params)

    wx.navigateBack({
      delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
    });
  },

  // 上传图片的回调函数
  handleProofChange({ detail }) {
    this.data.enclosures = detail
  },
 
}))
