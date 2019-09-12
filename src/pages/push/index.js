const app = getApp()
const comments = [
  { type: 'message', nickname: '美娜', avatar: 'http://wx.qlogo.cn/mmhead/ver_1/9JQ6iaezYgMicn888ZuCDCgorDUUo1ElvFvUSgSkNNiba54icYkXT9VR75TPaTMEvvWqtwqDibbKgnSwjIB23IVOufpwZdQSjPKOsStqKgKicmT2Q/132', content: '来一首薛之谦的歌' },
  { type: 'message', nickname: '小大人', avatar: 'http://wx.qlogo.cn/mmhead/ver_1/QmuRibB9cOzCRo55nZXJ3XicJtOicHWxgdmrMQov48zZ73tRvNFdVXK719vfuxlQjItRKeiaDGf9jdhiaibIOxFtcDeg/132', content: '一次坐公交,一位漂亮MM上了车,掏出了卡来刷卡,只听刷卡机回复:滴～老人卡～!全车人冻住' },
  { type: 'notice', nickname: "来自星球的美眉", content: '关注了主播，下次开播会自动提醒你' },
  // { type: 'message', nickname: "这个男人很酷", avatar: 'http://wx.qlogo.cn/mmhead/ver_1/qftwweBiaEF9lTHzMdtP3QAens3lmfREPjeaSzdetM4W4icaO8ia8icib4ediaJQJiaKicfGtbgQv6oC9nLNmygyErexSw/132', content: '我的唇吻不到我最爱的人' },
  { type: 'message', nickname: "颜颜", avatar: 'http://wx.qlogo.cn/mmhead/ver_1/YEnYXCR8Ek3hRaDmRlIcZSQRWH07ga1gCwgkwo99lohS7ZTXfX6JZNLCU939uQwLHmAQdsfv5kajRFXbbjCicicnhJqmdBTYiaiaTPMlDG7qnSg/132', content: '此时此刻需要来一首凉凉' }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    ctx: null,
    systemInfo: null,
    comments: comments,
    topHeight: 0,
    statusBarHeight: 0,
    liveHeight: 0,
    liveWidth: 0,
    isCommentView: false,
    isBottomView: false,
    isMessageView: true,
    isfoucs: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = {
      pushUrl: "rtmp://pili-publish.mofanbaby.tv/mofanbaby/test?e=1543420433&token=egDAwMCoNnwF65Cxu7k2WCOF9QiPkwFrj9Esr1Xv:jPchyiqh_TR4-IJNX_2RjtQg4vs="
    }
    console.log('app:', app)
    this.setData({
      item: item,
      topHeight: app.globalData.titleBarHeight,
      statusBarHeight: app.globalData.statusBarHeight,
      liveWidth: app.globalData.W,
      liveHeight: app.globalData.H
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ctx = wx.createLivePusherContext('pusher')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  error(e) {
    console.log(e);
  },
  bindStart() {
    this.ctx.start({
      success: res => {
        this.setData({
          pushing: true
        })
        console.log('start success')
      },
      fail: res => {
        console.log('start fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindSwitchCamera() {
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  },
  bindOpenMessage() {
    this.setData({
      liveHeight: app.globalData.H - 50,
      isCommentView: true,
      isBottomView: true,
      isMessageView: false,
      isfoucs: true
    })
  },
  bindBlur() {
    this.setData({
      liveHeight: app.globalData.H,
      isCommentView: false,
      isBottomView: false,
      isMessageView: true,
      isfoucs: false
    })
  }
})