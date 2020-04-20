import { connectPage } from "wx-redux"
import Action from '@/redux/action'
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({
  userProfile: state.userProfile
})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    // 是否已经发送请求验证码的请求
    vericodeValid: false,

    // 倒计时
    timeCounter: 60,

    // 验证码
    veriCode: ''
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

    await Api.UserProfile.getVeriCodeForVerify()
  },

  inputVeriCode({ detail }) {
    this.data.veriCode = detail.value
  },

  async veriOwnerShip(e) {
    await Api.UserProfile.veriOwnerShip({ "code": this.data.veriCode })
    router.redirect("changeMobile")
  }
}))