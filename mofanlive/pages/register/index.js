import { connect } from "libs/redux/index.js"
import _ from 'lodash'

import { loginWithUserInfo, loginWithMobile, interceptToken }  from 'wx-auth'

let pageConfig = {

  data: {
    avatar: 'https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg',

    phoneNumber: '',
    verificationCode: '',

    ifFocusPhone: false,
    ifFocusVerification: false,
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

  getVerificationCode(e) {

  },

  async bindgetuserinfo(e) {
    const result = await loginWithUserInfo(e)

    // 配置认证头信息
    // wx.axios.interceptors.request.use(interceptToken(token))

    // 测试发请求
    wx.axios.post('http://192.168.0.92:10240/passport/login/wxapp/59d66f14f87144c79524905d766db7e1', result)
      .then(function (response) {
        console.log('response', response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  },

  showError(msg) {
    wx.showToast({
      title: msg,
      duration: 2000,
      icon: 'none'
    })
  },

  // 注册前校验
  validate() {
    const { showError } = this
    const { phoneNumber, verificationCode } = this.data

    if (!/^1\d{10}$/.test(phoneNumber)) {
      showError('请输入正确的手机号')
      return false
    }
    
    if (_.trim(verificationCode) === '') {
      showError('请输入验证码')
      return false
    }

    return true
  },

  regLogin(e) {
    if (!this.validate()) return

  },

  focusPhone(e) {
    this.setData({ ifFocusPhone: true })
  },

  blurPhone(e) {
    this.setData({ ifFocusPhone: false })
  },

  inputPhone(e) {
    this.setData({ phoneNumber: e.detail.value })
  },

  focusVerification(e) {
    this.setData({ ifFocusVerification: true })
  },

  blurVerification(e) {
    this.setData({ ifFocusVerification: false })
  },

  inputVerification(e) {
    this.setData({ verificationCode: e.detail.value })
  },
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)