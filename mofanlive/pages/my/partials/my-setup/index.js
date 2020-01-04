import { connectPage } from 'wx-redux'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    showGender: false
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

  showGenderPopup(e) {
    this.setData({ showGender: true })
  },

  hideGenderPopup(e) {
    this.setData({ showGender: false })
  }

}))