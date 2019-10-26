//获取应用实例
var app = getApp()
import { numberFormat } from '../../utils/utils.js';
import { comments } from '../../../data/comment.js'

const audioAd = wx.createInnerAudioContext();
audioAd.autoplay = true;
audioAd.loop = true;




Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyboardHeight:0,
    isIphoneX: app.globalData.isIphoneX ? true : false,
    comments: comments,
    length:30,
    likes: 256,
    commentLikes: 0,
    isLiked: false,
    show: false,
    autoplay: true,
    videoTimes: '04:14',
    videoContext: null,
    percent: 0,
    isPlay: false,
    count: 0,
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    userInfo: {
      id: "845421031",
      sign: "生活在别处！",
      nickName: "骞",
      motto: '填写个性签名更容易获得别人关注呃！',
      like: 5,
      focus: 23,
      fans: 276500,
      photo: 23,
      collect: 49,
      dynamics: 12,
      log: '你看到了日志',
      avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Ylib33UuwG3TE0bK6cibd5S9sSP2mx2kyDDicyXKaJxSBDcMvANHgIR8kezUG7norOg1SVeiabpJiaH3v5Qia4NmoooA/132",
    },
    tList: [
      { name: "推荐", page: 0 },
      { name: "关注", page: 0 },
      { name: "身边", page: 0 },
    ],
    currentTab: 0,

    list: [Array(12), Array(2), Array(5)],
    currentItemNum: 0,
    goodsMap: [{}, {}, {}, {}, {}],
    logisticsMap: [{}, {}, {}, {}, {}],
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    windowHeight: app.globalData.windowHeight

  },

  likeHandle: function () {
    let likes;
    if (this.data.isLiked) {
      likes = this.data.likes - 1
    } else {
      likes = this.data.likes + 1
    }
    this.setData({
      isLiked: !this.data.isLiked,
      likes: likes
    })
  },

  // onLoad(options){
  //   // this.getList();
  //   // var systemInfo = wx.getSystemInfoSync()
  //   // this.setData({
  //   //   windowHeight: systemInfo.windowHeight,
  //   //   currentType:options.id ? options.id:0
  //   // })
  // },
  // 点击tab切换
  swichNav: function (res) {
    console.log(res)
    if (this.data.currentTab == res.detail.currentNum) return;
    this.setData({
      currentTab: res.detail.currentNum
    })
  },

  bindChange: function (e) {
    console.log("change", e, this.data.list[e.detail.current].length)
    this.setData({
      currentTab: e.detail.current,
      currentItemNum: this.data.list[e.detail.current].length,
    })

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // if (!this.data.list[e.detail.current].length)
    // this.getList();
  },

  bindFocus: function (e) {
    if (this.data.hasFoucsed) {
      wx.showToast({
        title: '取消关注',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({
      hasFoucsed: !this.data.hasFoucsed
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    if (app.globalData.isIphoneX) {
      this.setData({ isIphoneX: true })
    } else {
      this.setData({ isIphoneX: false })
    }
    this.videoContext = wx.createVideoContext('myVideo');

    console.log(this.videoContext)
    if (this.data.current.src) {
      audioAd.src = this.data.current.src;
      audioAd.onPlay(() => {
        console.log('开始播放背景音乐')
      })
      audioAd.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }

    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    this.setData({
      userInfo: { ...this.data.userInfo, fans: numberFormat(276500) }
    })
    // })

    wx.showShareMenu({
      withShareTicket: true,
      success: function (e) { console.log(e) },
      fail: function (e) { console.log(e) },
    })

    // wx.hideShareMenu()
  },

  // 点击开始播放
  play: function () {
    this.videoContext.play();
    this.setData({
      isPlay: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      height: app.globalData.statusBarHeight + app.globalData.titleBarHeight
    });

  },
  focusHandle: function (e) {
    if (this.data.hasFoucsed) {
      wx.showToast({
        title: '取消关注',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({
      hasFoucsed: !this.data.hasFoucsed
    })
  },

  playContronHandle: function (e) {
    this.setData({
      isPlaying: !this.data.isPlaying
    })
    !this.data.isPlaying ? audioAd.play() : audioAd.pause();
  },
  tabInputHandle: function (e) {
    console.log(e)
    this.setData({
      inputShow: true
    })
  },
  blurInputHandle: function (e) {
    console.log(e)
    this.setData({
      keyboardHeight: 0,
      inputShow: false
    })
  },
  focusInputHandle: function (e) {
    console.log("555", e)
    let { value, height } = e.detail
    this.setData({
      keyboardHeight: height,
      inputShow: true
    })
  },

  cancelHandle: function () {
    this.setData({
      keyboardHeight: 0,
      inputShow: false
    })
  },
  confirmInputHandle: function (e) {
    console.log(e)
  },
  submitHandle: function (e) {
    console.log(e)
    this.sendCommentsData()
  },

  sendCommentsData: function (data) {
    console.log("提交评论成功", data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    audioAd.play();
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
    audioAd.pause();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log("下拉", e)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log("触底", e)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log("onshare", e)
  }
})

