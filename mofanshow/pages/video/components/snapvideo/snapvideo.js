import { _comments } from '@/data/comments'
import { switchStarStatus, addNewComment } from '@/components/comment/commentHelper.js'

import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },

  properties: {
    // 数据项
    item: {
      type: Object,
      value: {},
    },

    // 当前视频项是否被激活（是否被滑动到可视区）
    active: {
      type: Boolean,
      value: false,
      observer: "videoActive"
    },

    touchEvent: {
      type: Object,
      value: null
    },
  },

  data: {
    ifShowVideo: false,

    videoContext: null,

    // 当前视频是否被暂停
    isVideoPaused: false,

    // 当前视频是否正在加载
    isLoading: false,

    // 是否显示 hpopup
    ifShowCommentPopup: false,

    // 是否显示评论输入框
    ifShowCommentInputPopup: false,

    // 回复谁？
    replyTo: null,
    
    comments: _comments,

    // 视频的时长
    videoDuration: 0,

    // 视频当前播放时间
    currentVideoTime: 0,

    // 是否显示 '不感兴趣' 弹层
    showNotInterestedIn: false,

    // 当前是否正在拖动进度条
    touchProgress: false,

    // 是否清屏（隐藏广告、右边的操作栏）
    clearScreen: false,

    // 双击视频次数
    doubleTapPos: {},

    watch: {
    }
  },

  methods: {
    videoActive(ifActive) {
      if(this.data.item){
        setTimeout(() => {
          if(ifActive){   // 视频滑入
            this.createVideoContext()
            setTimeout(() => {
              this.playVideo()
            }, 50);

          }else{        // 视频滑出
            // 视频划出，将这个视频对应的红心坐标清空
            this.setData({ doubleTapPos: {} })
            this.stopVideo()
          }

          this.setData({ ifShowVideo: ifActive })
        }, 300);
      }
    },

    // 播放视频
    playVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.play()
        this.setData({ isVideoPaused: false })
      }
    },

    // 暂停视频播放
    pauseVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.pause();
        this.setData({ isVideoPaused: true })
      }
    },

    // 停止播放视频
    stopVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.seek(0)
        videoContext.pause();
        this.setData({ videoDuration: 0, currentVideoTime: 0 })
      }
    },

    // 点击视频
    tapVideo(e){
      // 用 alreadyTapped 来判断很短时间内是否多次点击，对单机和双击作出不同响应
      if (!this.data.alreadyTapped) {
        this.data.alreadyTapped = true
        this.data.tapTimeout = setTimeout(() => {
          this.data.alreadyTapped = false
          this.toggleVideo()
        }, 300);

      } else {
        this.data.alreadyTapped = false
        clearTimeout(this.data.tapTimeout)
        this.setData({ doubleTapPos: e })
      }
    },

    // 切换视频播放状态
    toggleVideo() {
      const { isVideoPaused } = this.data

      isVideoPaused
        ? this.playVideo()
        : this.pauseVideo()
    },

    videoError(e){
      wx.showToast({
        title: '视频播放出错！',
        icon: 'none',
        duration: 2000
      })
    },

    // 视频播放进度改变时触发
    bindtimeupdate(e){
      const { duration, currentTime } = e.detail
      this.setData({ currentVideoTime: currentTime, videoDuration: duration })
    },

    // 等待加载时触发
    videoWaiting(e){
      this.setData({ isLoading: true })
    },

    // e.detail.buffered
    videoProgress(e){
      this.setData({ isLoading: false })
    },

    // 创建视频上下文
    createVideoContext(){
      let videoContext = wx.createVideoContext('videoId' + this.data.item.id, this)
      this.setData({ videoContext })
    },

    // 创建一条新的评论
    createNewComment(e){
      // 拿到新创建的评论，先将它插入到之前的数据列表中，然后存数据库？
      let { comments } = this.data
      const newComment = e.detail

      comments = addNewComment(comments, newComment)
      this.setData({ comments })
    },
    
    // 隐藏评论输入框
    hideCommentInputPopup(e){
      this.setData({ ifShowCommentInputPopup: false })
    },

    // 弹出评论输入框
    showCommentInputPopup(e){
      let replyTo = e.detail 
        ? (e.detail.nickName ? e.detail : e.currentTarget.dataset.replyto) 
        : null

      this.setData({ 
        ifShowCommentInputPopup: true,
        replyTo
      })
    },

    // 点击了小红心，切换点赞状态
    switchStarStatus(e){
      const { commentId } = e.detail
      let { comments } = this.data

      comments = switchStarStatus(comments, commentId)
      this.setData({ comments })
    },

    // 隐藏评论弹框
    hideCommentPopup(){
      this.setData({
        ifShowCommentPopup: false
      })

      // 通知上层组件，允许滑动屏幕了
      setTimeout(() => {
        this.triggerEvent('preventSwipe', false)
      }, 300);
    },

    // 显示评论弹框
    showCommentPopup(){
      this.setData({
        ifShowCommentPopup: true
      })

      // 通知上层组件，禁止滑动屏幕
      this.triggerEvent('preventSwipe', true)
    },

    preventSwipe(e) {
      this.triggerEvent('preventSwipe', e.detail)
    },

    longpress(e) {
      this.setData({ showNotInterestedIn: true, clearScreen: true })
    },

    hideNTIPopup(e) {
      this.setData({ showNotInterestedIn: false, clearScreen: false })
    },

    progressPercentChanged(e) {
      const { videoContext } = this.data

      videoContext.seek(e.detail)
      setTimeout(() => {
        this.playVideo()
      }, 500);
    },

    touchingProgress(e) {
      this.setData({ touchProgress: e.detail })
    },
  },

  lifetimes: {
    ready() {
    },
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)