// pages/live/play.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    videoObjectFit: "fillCrop",
    barHeight: app.globalData.statusBarHeight + 'px',
    isListen: false,
    avatar: 'http://wx.qlogo.cn/mmhead/ver_1/DE9c3ykTJjFuh1hBDwbMn6Lm3Q13CVteunWOicaxV9UVSVJeYAHbehgMqxkRPPtVsaXcicaAvs3GhmN1UuwaKnjw/96',
    anchorInfo: {
      anchorName: '小鱼儿',
      roomOnlineNum: 160
    },
    showNativeAttend: false,
    liveWidth: app.globalData.W,
    liveHeight: app.globalData.H,
    topList: [
      { src: 'http://wx.qlogo.cn/mmhead/ver_1/DE9c3ykTJjFuh1hBDwbMn6Lm3Q13CVteunWOicaxV9UVSVJeYAHbehgMqxkRPPtVsaXcicaAvs3GhmN1UuwaKnjw/96'},
      { src: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96' },
      { src: 'http://wx.qlogo.cn/mmhead/ver_1/YCeQBibDC8QEySGuZ0lypvdDHlOFykzexhUnQA5GSNyqSsorTLGia0UPT5h0Em36F44N8hLMv9GiaDic8eboWL8zHBNZYCnVlFUrdJDcIbgQqIM/132' },
    ],
    isBottomView: true,
    isMessageView: true,
    isfoucs: false,
    isIphoneX: false,
    showVideoCom: true,
    shouldCanvas: true,
    preRoomCover: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/40ba93b3a4ca76d2ac902f6ee9bd1b33-1542899088920.jpg',
    nextRoomCover: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/79deff30811089aff933818db02a9367-1542899089044.jpg',
    rateX: 0,
    rateY: 0,
    isAndroid: false,
    isPreBg: true,
    isNextBg: false,
    firstShowCover: true,
    isVideoReady: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
    })  
    this.ctx = wx.createLivePlayerContext('player')
    var t = wx.createCanvasContext("message-list");
    t.setFontSize(20), t.setFillStyle("#fff"), this.canvastx = t, this.cacheImage = {};
    const isIphoneX = app.globalData.model.indexOf('iPhone X') !== -1
    const item = {
      playUrl: "rtmp://pili-live-rtmp.mofanbaby.tv/mofanbaby/test"
    }
    const messages = [
      {nickname: '光头强', content: '', type: 'enterRoom'},
      { nickname: '辣妹子', content: '主播不要扯淡了，来点硬实力吧', type: 'chatMessage' },
      { nickname: '保利克洛维', content: '本次绘制是否接着上一次绘制。即 reserve 参数为', type: 'chatMessage' },
      { nickname: '一个很酷的男人', content: '', type: 'enterRoom' },
      { nickname: '一千个伤心的理由', content: '太多的接口，太多的理由，为了爱情我也背叛了所有，别再畏畏缩缩', type: 'chatMessage' },
    ]
    this.getNewMessage(messages)
    this.setData({
      item: item,
      loading: true,
      isIphoneX: isIphoneX,
      rateX: app.globalData.W / 375,
      rateY: app.globalData.H / 667
    })

    this.bindPlay()

  },
  monitor: function() {
    setTimeout(() => {
      if (!this.playing) {
        this.bindPlay()
      }
    }, 5000)
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
   * 视频缓冲时
   */
  buffer() {

  },
  /**
   * getNewMessage 获取新消息
   */
  getNewMessage: function (chatMessages) {
    this.canvastx.clearActions()
    this.canvastx.setTextBaseline("top")
    this.canvastx.font = "normal bold 14px PingFangSC"
    const that = this 
    let  num = 126
     chatMessages.reverse().forEach((message)=>{
       console.log('message:', message)
       if(message.type==='enterRoom') {
         that.canvastx.setFillStyle("#E0F2CF")
         that.canvastx.fillText(message.nickname + " 来了", 10, num) 
         num -=18
       }else if(message.type==='chatMessage') {
         that.canvastx.setFillStyle('#fff')
         const text = message.nickname + '：' + (message.content ? message.content : "")
         //考虑是否用占位符代替
         let handledText = that.wrapTextLine(text), isUse = true
         console.log('handledText:', handledText)
         handledText.forEach((line, index)=>{
           if(index === 0) {
             num -= 18 * (handledText.length - 1)
             console.log('num_'+index, num, line)
             if (handledText[0].indexOf('：') > -1) {
               let k = handledText[0].indexOf('：')
               isUse = true
               that.canvastx.setFillStyle("#A7EFDA") 
               that.canvastx.fillText(handledText[0].slice(0, k + 1), 10, num)
               that.canvastx.setFillStyle("#FFFFFF") 
               that.canvastx.fillText(handledText[0].slice(k + 1), 10 + that.canvastx.measureText(handledText[0].slice(0, k + 1)).width, num);

             }else {
               isUse = false
               that.canvastx.setFillStyle("#A7EFDA"), that.canvastx.fillText(handledText[0], 10, num); 
             }
           } else if(isUse) {
             console.log('num_1' + index, num, line)
             num += 18
             that.canvastx.setFillStyle("#FFFFFF")
             that.canvastx.fillText(line, 10, num); 
           } else {
             const j = line.indexOf("：")
             if(j > -1) {
               that.canvastx.setFillStyle("#A7EFDA")
               that.canvastx.fillText(line.slice(0, j+1), 10, num)
               that.canvastx.setFillStyle("#FFFFFF") 
               that.canvastx.fillText(line.slice(j + 1), 10, num) 
               isUse = true
             } else {
               that.canvastx.setFillStyle("#A7EFDA")
               that.canvastx.fillText(line, 10, num)
               isUse = false
             }
           }
         })
         num -= 18*handledText.length
       }else {
         console.log("礼物打赏敬请期待")
      }
     })
    this.canvastx.draw(false)
  },
  /**
   * 文字处理 t: 传入的文字参数
   */
  wrapTextLine: function (t) {
    const text = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15
    const arrText = t.split("")
    const handledText = []
    let r = ''
    for (let i = 0; i < arrText.length; i++) {
      const a = r + arrText[i];
      if (this.canvastx.measureText(a).width + text >= 276 && i > 0) {
        handledText.push(r)
        r = arrText[i]
      }else {
        r = a
        if (i == arrText.length - 1) {
          handledText.push(r)
        }        
      }
    }
    return handledText;
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindOpenMessage() {
    this.setData({
      liveHeight: app.globalData.H - 50,
      isCommentView: true,
      isBottomView: false,
      isMessageView: false,
      isfoucs: true,
      
    })
  },
  bindBlur() {
    this.setData({
      liveHeight: app.globalData.H,
      isCommentView: false,
      isBottomView: true,
      isMessageView: true,
      isfoucs: false
    })
  },
  goBack() {
    wx.navigateBack()
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
    // TODO 这里要判断是否断开，要重连
  },
  error(e) {
    console.error(e);
    console.error('live-player error:', e.detail.errMsg)
  },

  status(e) {
    console.info('status', e);
  },
  bindPlay() {
    this.ctx.play({
      success: res => {
        console.log('play success')
        
        this.setData({
          playing: true,
          loading: false
        })
      },
      fail: res => {
        console.error('play fail: ', res)
        this.setData({
          playing: false
        })

        this.monitor()
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
  bindMute() {
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  },
  //切换相机
  bindSwitchCamera() {
    this.ctx.switchCamera({
      success: res => {
        console.log('switch success')
      },
      fail: res => {
        console.log('switch fail')
      }
    })
  },
  handleProxy() {

  }
})