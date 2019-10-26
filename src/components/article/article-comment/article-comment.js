
Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: []
    },
  },

  data: {
    // 是否显示 hpopup
    ifShowCommentPopup: false,

    // 是否显示评论输入框
    ifShowCommentInputPopup: false,

    // 回复谁？
    replyTo: null,

    // 被回复的评论在所有评论的下标
    dataIndex: -1,
  },

  methods: {
    // 隐藏评论弹框
    hideCommentPopup(){
      this.setData({
        ifShowCommentPopup: false
      })
    },

    // 显示评论弹框
    showCommentPopup(e){
      const { dataindex } = e.currentTarget.dataset

      this.setData({
        ifShowCommentPopup: true,
        dataIndex: dataindex
      })
    },

    // 点击了小红心，切换点赞状态
    switchStarStatus(e){
      let commentId = e.detail.commentId || e.currentTarget.dataset.starto.commentId
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

    // 弹出评论输入框
    showCommentInputPopup(e){
      this.setData({ 
        ifShowCommentInputPopup: true,
        replyTo: e.detail.nickName ? e.detail : e.currentTarget.dataset.replyto
      })
    },

    // 隐藏评论输入框
    hideCommentInputPopup(e){
      this.setData({ ifShowCommentInputPopup: false })
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

  },

  lifetimes: {
    ready() {
    }
  }
})
