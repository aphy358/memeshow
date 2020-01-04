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
    profile: ''
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

  async saveProfile(e) {
    let { profile } = this.data
    profile = _.trim(profile)

    if (profile === '') {
      wx.showToast({
        title: '请输入简介！',
        duration: 2000,
        icon: 'none'
      })
      return
    }

    const res = await Api.userProfile.updateUserInfo({ signature: profile })
    this.updateUserProfile(res)
    wx.navigateBack()
  },

  bindinput(e) {
    this.setData({ profile: e.detail.value })
  },
}))