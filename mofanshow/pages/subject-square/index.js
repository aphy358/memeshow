import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let pageConfig = {

  data: {
    navOpcity: 0,
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
    let navOpcity = (e.scrollTop) / 50
    this.setData({ navOpcity })
  }
}

const mapStateToData = state => ({ items: state.MAIN.VIDEO.videoItems })
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)