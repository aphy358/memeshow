const app = getApp()
var {comments} = require('../../../data/comment.js')
var {videos} = require('../../../data/video.js')


var start;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX ? true : false,
    keyboardHeight:0,
    commentHeight:0,
    videoUrl:videos[2],
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    show: false,
    autoplay: true,
    videoContext: null,
    percent: 0,
    isPlay: true,
    count: 0,
    pages: 0,
    page: 1,
    subject: {},
    current: 0,
    subjectList: [],
    userInfo: {},
    hasUserInfo: false,
    inputTalk: '',
    comments: comments,
    talksPage: 1,
    talksPages: -1,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    talksAnimationData: {},
    follow: false,
    animationData: {
      videoAnimation: '',
      commentAnimation: '',
      productAnimation: ''
    },
    isHiddenSlide:false,
    isHiddenInfo: false,
    isHiddentools: false,
    isHiddenTransverse:false,
    isHiddenMask: true,
    hiddenClass: '',
    videoW: 0,
    videoH: 0,
    isHiddenComment: true,
    isHiddenProduct: true,
    system: {},
    isHiddenInput: true,
    inputFocus: false,
    isBarrage: false,
    isTransverse: false,
    barrageAnimation: null,
    transverseAnimation: null
  },

  changeSubject: function (current) {
    current = current || 0;
    var list = this.data.subjectList;
    if (list.length <= current) {
      return;
    }
    list[current].videoUrl = videos[current]
    this.setData({
      current: current,
      subject: list[current]
    })
    // 自动加载
    var diff = list.length - current;
    if (diff <= 5) {
      this.loadData(this.data.page + 1);
    }
  },
  like: function (e) {
    // 验证用户信息
    // if (!this.checkUserInfo()) return;
    var subject = this.data.subject;
    subject.like = !this.data.subject.like;
    if (subject.like){
      subject.likes = subject.likes + 1;
    }else{
      subject.likes = subject.likes - 1;
    }

    this.setData({
      subject: subject
    })
    api.like({
      subjectId: subject.subjectId
    })
  },
  apply: function (e) {
    wx.showToast({
      icon: 'none',
      title: "暂时还不能发布视频呦",
    })
  },
  checkUserInfo: function () {
    if (!app.globalData.userInfo) {
      wx.showModal({
        content: '请先授权访问你的基本信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'getuserinfo',
            })
          }
        }
      })
      return false;
    }
    return true;
  },
  //关注短视频
  follow: function () {
    setTimeout(() => {
      this.setData({
        follow: true
      })
    }, 1000)
    wx.showToast({
      icon: "success",
      title: "关注成功",
      duration: 1000
    })
  },
  /**
   * 底部弹窗，打开或者关闭都可以调用，bottom为0弹出，为负值就是隐藏多少
   */
  commentFade() {
    this.setData({
      commentHeight:526,
      isHiddenComment: false,
      isHiddenMask: false,
      isHiddenSlide: true,
      isHiddenProduct: true,
      isHiddenInfo: true,
      isHiddentools: true,
      isHiddenTransverse:true

    })
  },
  commentHide() {
    this.setData({
      commentHeight: 0,
      isHiddenComment: true,
      isHiddenMask: true,
      isHiddenSlide: false,
      isHiddenProduct: false,
      isHiddenInfo: false,
      isHiddentools: false,
      isHiddenTransverse:false
    })
  },

  /**
  * 点击遮罩层
  */
  clickMask() {
    this.setData({
      commentHeight: 0,
      isHiddenComment: true,
      isHiddenMask: true,
      isHiddenSlide: false,
      isHiddenProduct: false,
      isHiddenInfo: false,
      isHiddentools:false,
      isHiddenTransverse:false
    })
  },

  productViewFade() {
    console.log('显示产品图片')
    this.setData({
      isHiddenProduct: false,
      isHiddenMask: false,

    })
  },
  productViewHide() {
    this.setData({
      isHiddenProduct: true,
      isHiddenMask: true
    })
  },
  share: function (e) {
    wx.showToast({
      icon: 'none',
      title: "敬请期待",
    })
  },
  /**
   * 显示评论输入框
   */
  fadeInput() {
    this.setData({
      isHiddenInput: false,
      inputFocus: true,
      // isHiddenComment: true
    })
  },
  /**
   * 输入失去焦点
   */
  onBlur(e) {

    this.setData({
      keyboardHeight: 0,
      // isHiddenInput: true,
      // isHiddentools: false,
      // isHiddenInfo: false,
      // isHiddenMask: true,
      // inputFocus: false,
    })
  },
  onFocus:function(e){
    let { value, height } = e.detail
    this.setData({
      keyboardHeight: height,
      inputShow: true
    })
  },


  closeTransverse:function(){
   this.setData({
     isHiddenTransverse:true
   })
  },
  /**
   * 视频缓冲执行的事件
   */
  doBuffer() {
    // wx.showLoading()
  },
  loadData: function (page, success) {
    var that = this;
    api.getRecommendList({
      data: {
        page: page,
        size: 10,
        type: 'video'
      },
      success: function (res) {
        console.log('res', res)
        var list = res.content;
        if (list.length > 0) {
          var listData = [];
          for (var i = 0; i < that.data.subjectList.length; i++) {
            listData.push(that.data.subjectList[i])
          }
          for (var i = 0; i < list.length; i++) {
            listData.push(list[i])
          }
          that.setData({
            count: res.count,
            page: page,
            subjectList: listData
          })
          if (success) {
            success();
            console.log('subject:', that.data.subject)
            console.log('current:', that.data.current)
          }
        }
      }
    })
  },
  goBack() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let animation = wx.createAnimation({})
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    if (app.globalData.isIphoneX) {
      this.setData({ isIphoneX: true })
    } else {
      this.setData({ isIphoneX: false })
    }
    console.log(options)
    // 状态栏设置
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
    })
    this.setData({
      thisId:options.id,
      videoUrl: videos[options.id]
    })
    console.log(this.data.videoUrl)
    var that = this;
    // 登录回调
    if (app.globalData.isLogin) {
      console.log('默认登录成功')
      that.loadData(1, that.changeSubject)
    } else {
      app.onLogin = function () {
        that.loadData(1, that.changeSubject)
      }
    }

    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.onUserInfo = userInfo => {
        console.error('index.onUserInfo: ', userInfo)
        that.setData({
          userInfo: userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 初始化播放器上下文
    this.videoContext = wx.createVideoContext('myVideo')
    console.log(this.videoContext)
    this.system = wx.getSystemInfoSync()
    this.setData({
      videoW: this.system.windowWidth,
      videoH: this.system.windowHeight
    })
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    wx.setNavigationBarTitle({
      title: "魔范秀",
    })
  },

  // 视频播放时间更新
  timeupdate: function (e) {
    const val = e.detail.currentTime;
    const max = e.detail.duration;
    var percent = Math.round(val / max * 10000) / 100;
    this.setData({ percent: percent })
    const isLink = !this.data.isBarrage && this.data.subject.product && val > this.data.subject.product.beginTime
    const isPopup = !this.data.isTransverse && this.data.subject.product && val > this.data.subject.product.beginTime
    // console.log('boolean:', isLink, isPopup)
    // console.log('type', this.data.subject.product.type)
    if(isLink || isPopup) {
      const animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease'
      })
      animation.translateX(0).opacity(1).step()
      switch(this.data.subject.product.type) {
        case 1:
        this.setData({
          isBarrage: true,
          barrageAnimation: animation.export()
        })
        break
        case 2:
        this.setData({
          isTransverse: true,
          transverseAnimation: animation.export()
        })
        break
        default:
        break
      }
    }
  },

  // 点击播放按钮
  play: function () {
    if (this.data.isPlay) {
      this.videoContext.pause();
    } else {
      this.videoContext.play()
    }
  },

  // 开始播放
  bindPlay: function () {
    wx.hideLoading()
    console.log("Play")
    this.setData({ isPlay: true })
  },

  // 暂停播放
  bindPause: function () {
    console.log("Pause")
    this.setData({ isPlay: false })
  },

  // 播放完毕
  bindEnded: function () {
    this.setData({ isPlay: false })
  },

  // 播放上一个抖音
  pre: function () {
    const animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    })
    // animation.opacity(0).opacity(1),step()
    // console.log('animation:', animation)
    this.setData({
      ["animationData.videoAnimation"]: animation.export()
    })
    this.changeSubject(this.data.current - 1);
  },

  // 播放下一个抖音
  next: function () {
    this.changeSubject(this.data.current + 1);
    // console.log('animationData.videoAnimation', this.data.animationData.videoAnimation)
  },

  // 下面主要模仿滑动事件
  touchstart: function (e) {
    start = e.changedTouches[0];
    // console.log("touchstart ", e.changedTouches[0])
  },

  touchmove: function (e) {
    // console.log("touchmove ", e.changedTouches[0])
  },

  touchend: function (e) {
    // console.log("touchend ", e.changedTouches[0])
    this.getDirect(start, e.changedTouches[0]);
  },

  touchcancel: function (e) {
    // console.log("touchcancel ", e.changedTouches[0])
    this.getDirect(start, e.changedTouches[0]);
  },

  // 计算滑动方向
  getDirect(start, end) {
    var X = end.pageX - start.pageX,
      Y = end.pageY - start.pageY;
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      console.log("left 2 right");
    }
    else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      console.log("right 2 left");
    }
    else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      wx.showToast({
        title: '向上滑动',
      })
      console.log("top 2 bottom");
      this.pre()
    }
    else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      wx.showToast({
        title: '上下滑动，fuck',
      })
      console.log("bottom 2 top");
      this.next()
    }
  }
})