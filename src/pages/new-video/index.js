// pages/new-video/index.js
//定义一些视频
const videos = [
  'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/504df73ac7bdb24a26855474a8f4246b-1541658595592.mp4',
  'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/564735c99c6abefbee7ca32db6b2e2f2-1541658644065.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/0a1621b5b58a38b9e33c719b6331795c-1541662843946.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/b1ee79d1afae026fdeba8fa7fc682171-1541662852002.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/dc300b5ba82fe401bee437097cae3de3-1542820535328.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/cb2cb4c4a9ea0c6d408514ec449593b0-1542820561991.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/9b7d44643c34838ad113282f93f17ab4-1542820568477.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/ea4b35c1f59c3fdf7a28974e75325449-1542820575479.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/eaa964a33ec8370336c3b5ce89b1703b-1542820582433.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/f736bfa9b902af4ae2c730b611c41fd5-1542820586932.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/e5743b950d40a101e1f3bdf0c0698086-1542820590943.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/24e2c56b15496ed8e1c9b622090e7feb-1542820595538.mp4',
  'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/b59f4b87980968cf301ce381192a0401-1542820599684.mp4'
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainPage: true,
    feedList: [],
    feedIndex: 0,
    preloadedIndex: 1,
    animation: false,
    transform: null,
    batchFeedIndex: [],
    comments: [],
    isShowComment: false,
    isShowCommentLoaded: false,
    isPlaying: false,
    percent: 0,
    animationPrograss: {},
    animationMusic: {},
    showModal: false,
    videoHidden: false,
    isHide: false,
    isIOS: false,
    isSyncFrame: false,
    hasImageBug: false,
    screenSize: {},
    forward: false,
    from: "",
    systemInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      systemInfo: wx.getSystemInfo()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})