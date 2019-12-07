const app = getApp()
const api = require('../../utils/api.js')

const videoLists = [
  {
    id: 1,
    name: '浮生若梦，无你何欢',
    type: 'video',
    width: 608,
    height: 544,
    url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/564735c99c6abefbee7ca32db6b2e2f2-1541658644065.mp4',
    desc: '科比罚球线高高跃起，就像空中的一道闪电，直接颜扣霍华德',
    likes: 320,
    comments: 260,
    shares: 300,
    belonger: {
      name: '郭美美',
      avater: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96',

    }
  },
  {
    id: 2,
    name: '杨幂幂',
    type: 'video',
    width: 352,
    height: 640,
    url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/504df73ac7bdb24a26855474a8f4246b-1541658595592.mp4',
    desc: '杨幂幂今日在武汉为某商场站台，一袭半透明的白色蕾丝吊带群，看上去十分性感，网友戏称：”杨幂幂要与网红抢饭碗“',
    likes: 320,
    comments: 260,
    shares: 300,
    belonger: {
      name: '郭美美',
      avater: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96',

    }
  },
  {
    id: 3,
    name: '浮生若梦，无你何欢',
    type: 'video',
    width: 608,
    height: 544,
    url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/0a1621b5b58a38b9e33c719b6331795c-1541662843946.mp4',
    desc: '科比罚球线高高跃起，就像空中的一道闪电，直接颜扣霍华德',
    likes: 320,
    comments: 260,
    shares: 300,
    belonger: {
      name: '郭美美',
      avater: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96',

    }
  },
  {
    id: 4,
    name: '杨幂幂',
    type: 'video',
    width: 352,
    height: 640,
    url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/b1ee79d1afae026fdeba8fa7fc682171-1541662852002.mp4',
    desc: '杨幂幂今日在武汉为某商场站台，一袭半透明的白色蕾丝吊带群，看上去十分性感，网友戏称：”杨幂幂要与网红抢饭碗“',
    likes: 320,
    comments: 260,
    shares: 300,
    belonger: {
      name: '郭美美',
      avater: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96',

    }
  }
]

var start;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    talks: [],
    talksPage: 1,
    talksPages: -1,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    talksAnimationData: {},
    follow: false,
    animationData: {
      commentAnimation: '',
      productAnimation: ''
    },
    showComment: false,
    isHiddenVideo: false,
    isHiddenControl: false,
    hiddenClass: ''
  },

  changeSubject: function (current) {
    current = current || 0;
    var list = this.data.subjectList;
    if (list.length <= current) {
      return;
    }
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
    if (!this.checkUserInfo()) return;
    var subject = this.data.subject;
    subject.like = true;
    subject.likes = subject.likes + 1;
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
  popupBottom(event) {
    const animation = event.currentTarget.dataset.animation
    const bottom = event.currentTarget.dataset.bottom
    let Animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    })
    Animation.bottom(bottom).step()
    this.setData({
      ['animationData.' + animation]: Animation.export()
    })
  },

  share: function (e) {
    wx.showToast({
      icon: 'none',
      title: "敬请期待",
    })
  },

  loadData: function (page, success) {
    var that = this;
    this.setData({
      page: page
    })
    api.getRecommendList({
      data: {
        page: page,
        rows: 5,
        type: 'video'
      },
      success: function (res) {
        var list = res.content;
        if (list) {
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
            pages: res.pages,
            subjectList: listData
          })
          if (success) {
            success();
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 登录回调
    if (app.globalData.isLogin) {
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

    wx.setNavigationBarTitle({
      title: "魔范秀",
    })
  },

  // 视频播放时间更新
  timeupdate: function (e) {
    var val = e.detail.currentTime;
    var max = e.detail.duration;
    var percent = Math.round(val / max * 10000) / 100;
    this.setData({ percent: percent })
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
    this.setData({ isPlay: true })
  },

  // 暂停播放
  bindPause: function () {
    this.setData({ isPlay: false })
  },

  // 播放完毕
  bindEnded: function () {
    this.setData({ isPlay: false })
  },

  // 播放上一个抖音
  pre: function () {
    this.changeSubject(this.data.current - 1);
  },

  // 播放下一个抖音
  next: function () {
    this.changeSubject(this.data.current + 1);
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
      console.log("top 2 bottom");
      this.pre()
    }
    else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      console.log("bottom 2 top");
      this.next()
    }
  }
})