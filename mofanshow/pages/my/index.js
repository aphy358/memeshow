import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let pageConfig = {

  data: {
    // 是否显示导航栏
    navOpcity: 0,

    // 用户类型：1、卖家   2、达人
    userType: 1,
  },

  onLoad: function (options) {

  },

  onReady: function () {
    
  },

  onShow: function () {

  },

  onPageScroll: function(e) {
    this.setNavOpacity(e)
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

  setNavOpacity(e) {
    let navOpcity = (e.scrollTop - 50) / 50
    this.setData({ navOpcity })
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)