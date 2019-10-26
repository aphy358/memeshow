import { _comments } from './testData/comments'
import { animateTo } from '../../components/common/utils'

Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 数据项
    item: {
      type: Object,
      value: {},
      observer(newVal) {
      }
    },

    // 当前项是否被激活
    active: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.resetProgress()

        if(this.data.item){
          setTimeout(() => {
            if(newVal){   // 视频滑入
              this.showAdBoard()
              this.createVideoContext()
              this.playVideo()
            }else{        // 视频滑出
              this.hideAdBoard()
              this.stopVideo()
              this.setData({ isVideoPlaying: true })
            }
  
            this.setData({ ifShowVideo: newVal })
          }, 300);
        }
      }
    },
  },

  data: {
    ifShowVideo: false,

    videoContext: null,

    // 当前视频是否正在播放
    isVideoPlaying: true,

    // 广告牌动画
    adAnimation: {},

    // 广告牌是否已经显示
    adShown: false,

    // 广告牌显示计时器
    adTimeout: null,

    // 是否显示 hpopup
    ifShowCommentPopup: false,

    // 是否显示评论输入框
    ifShowCommentInputPopup: false,

    // 回复谁？
    replyTo: null,
    
    comments: _comments,

    // 进度条动画
    progressAnimation: {},

    // 当前视频是否正在加载
    isLoading: false,

    // 视频的时长
    videoDuration: 0,

    // 视频当前播放时间
    currentVideoTime: 0,
  },

  methods: {
    // 播放视频
    playVideo(){
      const { videoContext, videoDuration } = this.data

      if(videoContext){
        videoContext.play()
        this.setData({ isVideoPlaying: true })

        if(videoDuration){
          this.restartProgress()
        }
      }
    },

    // 暂停视频播放
    pauseVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.pause();
      }
      
      this.setData({ isVideoPlaying: false })
      this.pauseProgress()
    },

    // 暂停进度条动画
    pauseProgress(){
      const { videoDuration, currentVideoTime } = this.data
      const rate = currentVideoTime / videoDuration * 100 + '%'

      let progressAnimation = animateTo({ 'width': rate }, 0, 'linear')
      this.setData({ progressAnimation })
    },

    // 重新开始进度条动画（在原来的进度基础上）
    restartProgress(){
      const { videoDuration, currentVideoTime } = this.data

      let progressAnimation = animateTo(
        { 'width': '100%' }, 
        (videoDuration - currentVideoTime) * 1000, 
        'linear'
      )

      this.setData({ progressAnimation })
    },

    // 停止播放视频
    stopVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.seek(0)
        videoContext.pause();
        this.setData({ isVideoPlaying: false })
      }
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

      if(newComment.commentLevel === 2){
        // 如果是二级评论，则插入到对应父评论下的子评论数组头部
        for (let i = 0; i < comments.length; i++) {
          let ele = comments[i]
          if(ele.commentId == newComment.parentId){
            ele.childComments.unshift(newComment)
            break;
          }
        }
      }else{
        // 如果是一级评论，则直接插入到数组的头部
        comments.unshift(newComment)
      }

      this.setData({ comments })
    },
    
    // 隐藏评论输入框
    hideCommentInputPopup(e){
      this.setData({ ifShowCommentInputPopup: false })
    },

    // 弹出评论输入框
    showCommentInputPopup(e){
      this.setData({ 
        ifShowCommentInputPopup: true,
        replyTo: e.detail.nickName ? e.detail : e.currentTarget.dataset.replyto
      })
    },

    // 点击了小红心，切换点赞状态
    switchStarStatus(e){
      const { commentId  } = e.detail
      let { comments } = this.data

      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i]
        if(comment.commentId === commentId){
          comment.iAlreadyStared = !comment.iAlreadyStared
          comment.iAlreadyStared ? comment.starCount++ : comment.starCount--
          return this.setData({ comments })

        }else{
          if(comment.childComments){
            for (let j = 0; j < comment.childComments.length; j++) {
              let childComment = comment.childComments[j]
              if(childComment.commentId === commentId){
                childComment.iAlreadyStared = !childComment.iAlreadyStared
                childComment.iAlreadyStared ? childComment.starCount++ : childComment.starCount--
                return this.setData({ comments })
              }
            }
          }
        }
      }
    },

    // 隐藏评论弹框
    hideCommentPopup(){
      this.setData({
        ifShowCommentPopup: false
      })

      setTimeout(() => {
        this.triggerEvent('preventSwipe', false)
      }, 300);
    },

    // 显示评论弹框
    showCommentPopup(){
      this.setData({
        ifShowCommentPopup: true
      })

      this.triggerEvent('preventSwipe', true)
    },

    // 隐藏广告面板
    hideAdBoard(){
      // 如果广告牌还没显示出来，但是之前已经设置了定时器，则删除该定时器，比如用户在短时间内上下翻动视频的时候就会出现这种情况
      if(!this.data.adShown && this.data.adTimeout){
        clearTimeout(this.data.adTimeout)
        this.data.adTimeout = null
      }

      let adAnimation = animateTo({
        'left': '-20rpx',
        'translateX': '-100%',
        'translateY': '-100%'
      })
      this.setData({ adAnimation })
      this.data.adShown = false
    },

    // 显示广告面板
    showAdBoard(){
      // 当前视频被激活后，3秒后显示广告牌
      this.data.adTimeout = setTimeout(() => {
        let adAnimation = animateTo({
          'left': '0',
          'translateX': '0',
          'translateY': '-100%'
        })
        this.setData({ adAnimation })
        this.data.adShown = true
      }, 3000);
    },

    // 点击视频
    tapVideo(e){
      const { isVideoPlaying } = this.data

      isVideoPlaying
        ? this.pauseVideo()
        : this.playVideo()
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
      const { videoDuration, currentVideoTime } = this.data

      // 如果是第一次播放，或者是重复播放，先将进度条归位，并开启进度条动画
      if(!videoDuration || currentVideoTime > currentTime){
        this.resetProgress(currentTime / duration * 100)

        let progressAnimation = animateTo(
          { 'width': '100%' }, 
          (duration - currentTime) * 1000, 
          'linear'
        )
        
        this.setData({ progressAnimation })
        this.data.videoDuration = duration

      }else{
        // 如果是一般时刻的进度更新，则先判断下之前有没有等待加载的情况，如果有，则先清空定时器，并重置 loading 状态
        if(this.data.waitTimeout){
          this.restartProgress()
          clearTimeout(this.data.waitTimeout)
          this.setData({ isLoading: false })
        }
      }

      this.data.currentVideoTime = currentTime
    },

    // 等待加载时触发
    videoWaiting(e){
      this.pauseProgress()
      this.data.waitTimeout = setTimeout(() => {
        this.setData({ isLoading: true })
      }, 300);
    },

    // e.detail.buffered
    videoProgress(e){
    },

    // 将进度条设置为指定进度
    resetProgress(percent){
      let progressAnimation = animateTo({ 'width': percent ? percent + '%' : '0%' }, 0)
      this.setData({ progressAnimation })
      this.data.videoDuration = 0
      this.data.currentVideoTime = 0
    }
  },

  lifetimes: {
    ready() {
    },
    created() {
    }
  }
})
