import _ from 'lodash'
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
    nickName: ''
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

  async saveNickName(e) {
    let { nickName } = this.data
    nickName = _.trim(nickName)

    if (nickName === '') {
      wx.showToast({
        title: '请输入有效昵称！',
        duration: 2000,
        icon: 'none'
      })
      return
    }

    const res = await Api.userProfile.updateUserInfo({ nickname: nickName })
    if (!!res) {
      this.updateUserProfile(res)
    }
    wx.navigateBack()
  },

  bindinput(e) {
    this.setData({ nickName: e.detail.value })
  }
}))