import { _comments } from './testData/comments'
import { animateTo } from '../../components/common/utils'

Component({
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
        if(this.data.item){
          setTimeout(() => {
            if(newVal){
              this.showAdBoard()
              this.createVideoContext()
              this.playVideo()
            }else{
              this.hideAdBoard()
              this.stopVideo()
              this.resetProgress()
            }
  
            this.setData({ ifShowVideo: newVal })
          }, 300);
        }
      }
    },
  },

  data: {
    ifShowVideo: false,

    // 当前视频是否已经初始化了
    videoInitialed: false,

    videoContext: null,

    progressAnimation: {},

    // 广告牌动画
    adAnimation: {},

    percentage: 50,

    // 是否显示 hpopup
    ifShowCommentPopup: false,

    comments: _comments,

    // 是否显示评论输入框
    ifShowCommentInputPopup: false,

    // 回复谁？
    replyTo: null,

    // 当前视频是否正在播放
    isVideoPlaying: true,

    // 广告牌是否已经显示
    adShown: false,

    // 广告牌显示计时器
    adTimeout: null,
  },

  methods: {
    playVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.play()
        this.setData({ isVideoPlaying: true })
      }
    },

    pauseVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.pause();
        this.setData({ isVideoPlaying: false })
      }
    },

    stopVideo(){
      const { videoContext } = this.data

      if(videoContext){
        videoContext.seek(0)
        videoContext.pause();
        this.setData({ isVideoPlaying: false })
      }
    },

    createVideoContext(){
      let videoContext = wx.createVideoContext('videoId' + this.data.item.id, this)
      this.setData({ videoContext })
    },

    // 创建一条新的评论
    createNewComment(e){
      console.log('createNewComment: ', e.detail);
      
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
        replyTo: e.detail
      })
    },

    // 点击了小红心，切换点赞状态
    switchStarStatus(e){
      console.log('switchStarStatus: ', e.detail);

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

    bindtimeupdate(e){
      const { videoInitialed, active } = this.data

      // // 如果视频之前还从来没播放过，则说明现在是第一次播放，并已经初次播放了，现在需要将视频暂停到最开始的位置了
      // if(!videoInitialed){
      //   if(!active){
      //     this.stopVideo()
      //   }
      //   this.setData({ videoInitialed: true })
      // }

      // if(!this.data.videoDuration){
      //   if(e.detail && e.detail.duration){
      //     this.data.videoDuration = e.detail.duration

      //     let progressAnimation = animateTo({
      //       'width': '100%'
      //     }, e.detail.duration * 1000, 'linear')

      //     this.setData({ progressAnimation })
      //   }
      // }
    },

    resetProgress(){
      let progressAnimation = animateTo({
        'width': '0%'
      }, 0, 'linear')
      
      this.setData({ progressAnimation })
    }
  },

  lifetimes: {
    ready() {
    },
    created() {
    }
  }
})
