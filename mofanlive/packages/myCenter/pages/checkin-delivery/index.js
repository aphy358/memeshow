import { connectPage } from "wx-redux"
const Api = wx.X.Api

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    // 上传的凭证
    enclosures: [],

    refundId: null,

    logistics: {
      range: [
        "顺丰",
        "百世",
        "申通",
        "中通",
        "圆通",
        "韵达",
        "邮政",
        "EMS",
        "天天",
        "京东",
        "优速",
        "德邦",
        "宅急送"
      ],
      selected: ''
    },
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

  validateForm(params) {
    const { dist: { express, expressNo } } = params

    if (!express) {
      wx.showToast({
        title: "请选择快递公司",
        icon: "none"
      })
      return false
    }

    if (!expressNo) {
      wx.showToast({
        title: "请输入快递单号",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { enclosures, refundId, logistics } = this.data
    const { expressNo, remark } = detail.value

    const params = {
      refundId,
      dist: {
        express: logistics.selected,
        expressNo,
        remark,
        enclosures
      }
    }

    if (!this.validateForm(params))  return false;

    await Api.Refund.checkinDelivery(params)

    wx.navigateBack({
      delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
    });
  },

  // 上传图片的回调函数
  handleProofChange({ detail }) {
    this.data.enclosures = detail
  },

  handleLogisticsChange({ detail }) {
    this.setData({
      "logistics.selected": this.data.logistics.range[detail.value]
    })
  },
 
}))