import { connectPage } from 'wx-redux'
import Action from '@/redux/action'
const Api = wx.X.Api

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  updateUserProfile(userProfile) {
    dispatch(Action.userProfile.update(userProfile))
  }
})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    // 是否已经发送请求验证码的请求
    vericodeValid: false,

    // 倒计时
    timeCounter: 60,

    // 验证码
    veriCode: '',

    mobile: ''
  },

  onLoad: function (options) {

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

  onShareAppMessage: function () {

  },

  // 获取验证码
  async getVeriCode(e) {
    this.setData({
      vericodeValid: true,
      timeCounter: 60
    })

    this.data.veriInterval = setInterval(() => {
      let { timeCounter } = this.data

      if (timeCounter <= 0) {
        clearInterval(this.data.veriInterval)
        this.data.veriInterval = null
        this.setData({
          vericodeValid: false,
          timeCounter: 60
        })
      } else {
        this.setData({ timeCounter: --timeCounter })
      }
    }, 1000);

    await Api.UserProfile.getVeriCodeForSetMobile({ mobile: this.data.mobile })
  },

  inputVeriCode({ detail }) {
    this.data.veriCode = detail.value
  },

  inputMobile({ detail }) {
    this.data.mobile = detail.value
  },

  async changeMobile(e) {
    let params = {
      "mobile": this.data.mobile,
      "code": this.data.veriCode
    }
    let res = await Api.UserProfile.resetMobile(params)
    if (!!res) {
      this.updateUserProfile(res)
    }
    wx.navigateBack()
  }
}))
