import { connect } from "libs/redux/index.js"
import { menuBtn } from "ui-kit/behaviors/menuBtn"

const app = getApp()
const store = app.store


let pageConfig = {
  behaviors: [menuBtn()],

  data: {
    playURL: 'rtmp://pili-live-rtmp.mofanbaby.tv/mofanbaby/test-1',
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.playContext = wx.createLivePlayerContext('player', this);

    this.playContext.play({
      success: function() {
        console.log('play success');
      },
      fail: function() {
        console.log('play fail');
      },
      complete: function() {
        console.log('complete');
      }
    });

    // this.playContext.requestFullScreen({ direction: 0 });
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

  stopLivePlayer(e) {
    this.playContext.stop()
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)