
import { mediumItems } from '../../data/my.js'
import { focusData } from '../../data/focus.js'
var { comments } = require('../../data/comment.js')

var app = getApp()
console.log(app)
Page({
  data: {
    selected:1,
    playIndex:0,
    inRangBox:[],
    isLiked:false,
    animationType:'bounceIn',
    comments: comments,
    focusData: focusData,
    articleData: {
      isShowMoreArticle: false,
      fontSize:28,
      isPlaying:false,
      isShowPoster:true,
    },
    isPlaying: true,
    mediumData: mediumItems,
  },
  preventTouchMove:function(){
    console.log('preventTouchMove')
  },

  onfocus: function (res) {
    console.log(res)
    let { value, height } = res.detail;
    this.setData({
      keyboardHeight: height - app.globalData.tabBarHeight
    })
  },
  onblur: function (res) {
    this.setData({
      keyboardHeight: 0
    })
  },

  onConfirm: function (res) {
    console.log(res)
    if (res.currentTarget.dataset.value) {
      console.log(res.currentTarget.dataset.value)
    } else {
      if (!res.detail.value || res.detail.value == '') { return }
    }
    this.setData({ commentValue: '' })
  },

  onInput: function (res) {
    console.log(res)
    this.setData({
      commentValue: res.detail.value
    })
  },

  // 文章
  onTapToggleMoreArticle: function (e) {
    // this.setData({
    //   articleData: {
    //     ...this.data.articleData,
    //     isShowMoreArticle: !this.data.articleData.isShowMoreArticle
    //   }
    // })
    this.onTapGoToArticleDetailPage()

  },

  onTapGoToArticleDetailPage:function(res){
    wx.navigateTo({
      url: '/packageContent/pages/article/detail',
    })
  },


  //
  openCommentsPanel: function (res) {
    console.log(res)
    let itemId = res.currentTarget.dataset.index;
    const query = wx.createSelectorQuery()
    query.select(`#dynamics-item-${itemId}`).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log(this.data.screenHeight, res[0].bottom - 425)
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置;
      this.setData({
        transfromY: res[0].bottom - 425,
        currentItem: itemId,
        isShowCommentsPanel: true
      })
    })
  },


  // onTapCloseActionPanel 关闭评论弹窗
  onTapCloseActionPanel: function (res) {
    console.log("close")
    this.setData({
      transfromY: 0,
      isShowSharePanel: false,
      isShowCommentsPanel: false
    })
  },

  //用户列表 不感兴趣
  onTapNointerest:function(res){
    this.setData({
      mediumData: this.data.mediumData.filter((e, i) => {
        return res.currentTarget.dataset.index!= i
      }),
    })
  },

  //用户列表 关注
  onTapFocus: function (res) {
    this.setData({
      mediumData: this.data.mediumData.filter((e, i) => {
        return res.currentTarget.dataset.index != i
      }),
    })
  },


  // more
  onTapShowMorePopup:function(res){
    this.setData({
      isShowMorePopup: true,
      selectIndex:res.currentTarget.dataset.index
    })
  },

  onTapCloseMorePopup:function(res){
    this.setData({
      isShowMorePopup: false
    })
  },

  // 取消关注
  onTapDeleteItem:function(){
    this.setData({
      focusData: this.data.focusData.filter((e,i)=>{
        return this.data.selectIndex!=i
      }),
      isShowMorePopup: false
    })
  },

  // 分享及更多操作
  onTapShowSharePanel:function(res){
    this.setData({
      isShowMorePopup:false,
      isShowSharePanel:true
    })
  },




  //  点击播放按钮
  onTogglePlay:function(res){
    console.log(res)
    this.setData({
      playIndex: res.detail.id,
      appear:true
    })
  },




  playHandle: function () {
    console.log(this.data.isPlaying)
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  // 点赞按钮
  onTapToggleLike: function (res) {
    console.log(res)
    this.setData({
      isLiked: !this.data.isLiked,
      likeCurrent: res.currentTarget.dataset.index
    })
    if (this.data.isLiked) {
      // wx.showToast({ title: '点赞成功'})
      wx.Toast({ duration: 1000, message: "点赞成功" })
    }
    else {
      wx.Toast({ duration: 1000, message: "取消点赞" })
    }
  },



  // onPageTouchend:function(res){
  //   // this.intersection()
  // },
  // onPageTouchstart: function (res) {
  //   // if (this._observer) this._observer.disconnect();
  // },
  // onPageTouchmove: function (res) {
  //   // this.intersection()
  // },

  intersection:function () {
    let H = this.data.screenHeight;
    let that = this;
    this._observer = wx.createIntersectionObserver(this,{ observeAll: true });
    this._observer.relativeTo('.range-box')
      .observe('.dynamics-item', (res) => {
        console.log("_observer", that._observer,res)
        if (res.intersectionRatio > 0) {
          that.setData({
            playIndex: res.dataset.id,
            videoPlay: true
          })
        }
      });

  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options){
   console.log(options)
   let {prePage} = options;
   if(prePage=='previewArticle'){
     this.setData({
       isShowSharePanel:true
     })
   }
  },

  onPlay: function (res) {
    var touchStartTime = new Date().getTime();
    console.log(res, touchStartTime)
    this.setData({
      touchStartTime,
      videoPlay: true,
      playIndex: res.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // if (this._observer) this._observer.disconnect()
    that._observer && that._observer.disconnect();
    that._observer = null;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log(e, this.getTabBar())
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    if (this.animation) {
      this.setData({ animationType: this.animation })
      console.log(this.data.animationType)
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
  onPullDownRefresh: function (e) {
    console.log(e)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log("触底", e)
    if (this.data.isLoading == 1) { return }
    this.setData({ isLoading: 1 }, () => {
      this.mockLoadTimer && clearTimeout(this.mockLoadTimer);
      this.mockLoadTimer = null;
      this.mockLoadTimer = setTimeout(() => {
        this.setData({ isLoading: 2 })
      }, 500)
    })
  },

  onPageScroll(res) {
    // this._observer && this._observer.disconnect();
    // this._observer = null;
    this.timer3 && clearTimeout(this.timer3);
    this.timer3=null;
    this.timer3 = setTimeout(() => {
      this.intersection();
    },200);
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    // console.log("onshare", e)
  }
})
