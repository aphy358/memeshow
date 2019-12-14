import { connect } from "libs/redux/index.js"


let pageConfig = {

  data: {
    avatar: 'https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg',
  },

  onLoad: function (options) {
    // wx.login({
    //   success (res) {
    //     if (res.code) {
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
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

  getuserinfo(e) {
console.log('getuserinfo', e);

  },

  gotoRegister(e) {
    wx.navigateTo({
      url: '/pages/register/index',
    })
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)