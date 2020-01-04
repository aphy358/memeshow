import { connectPage } from 'wx-redux'
import Action from '../../redux/action'

const Api = wx.X.Api

const mapStateToProps = state => ({
  userProfile: state.userProfile
})

const mapDispatchToProps = dispatch => ({
  updateUserProfile(userProfile) {
    dispatch(Action.userProfile.update(userProfile))
  }
})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {

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

  async getUserInfo({ detail }) {
    if (detail.errMsg !== 'getUserInfo:fail auth deny') {
      const userProfile = await Api.auth.loginByUserInfo(detail)
      if (!!userProfile) {
        this.updateUserProfile(userProfile)
      }
    }
  },

}))