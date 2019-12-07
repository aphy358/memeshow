import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let pageConfig = {

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

  }
}

const mapStateToData = state => ({ items: state.MAIN.VIDEO.videoItems })
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)