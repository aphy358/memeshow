import { _comments } from './testData/comments'
import { animateTo } from '../../components/common/utils'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    percentage: 0,

    // 评论输入弹层动画
    customAnimation: {},

    // 是否显示 hpopup
    ifShowCommentPopup: false,

    ifShow0: false,

    bounceClass: '',

    comments: _comments,

    // 是否显示评论输入框
    ifShowCommentInputPopup: false,

    // 回复谁？
    replyTo: null
  },

  onLoad: function (options) {
    
  },

  onReady: function () {

  },

  onShow: function () {
    let customAnimation = animateTo({
      'width': '100%'
    }, 20000, 'linear')

    this.setData({ customAnimation })
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  clickBtn(){
    // this.setData({
    //   ifShow0: true,
    //   bounceClass: 'bounceOut',
    // })

    this.setData({
      ifShowCommentPopup: true
    })
  },

  hideCommentPopup(){
    // this.setData({
    //   ifShow0: false,
    // })
    this.setData({
      ifShowCommentPopup: false
    })
  },

  hidePopup(){
    this.setData({
      ifShow0: false,
      bounceClass: 'bounceIn',
    })
  },

  showCommentInputPopup(e){
    this.setData({ 
      ifShowCommentInputPopup: true,
      replyTo: e.detail
    })
  },

  hideCommentInputPopup(e){
    this.setData({ ifShowCommentInputPopup: false })
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
  }
})