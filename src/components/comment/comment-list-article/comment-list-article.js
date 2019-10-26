Component({
  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: [],
      observer(newVal) {
        if (!this.data.initialized) return;

        if(newVal.length > 0){
          let comment = Object.assign(newVal[0])
          let commentsShow = [comment]
          if(comment.childComments){
            commentsShow = commentsShow.concat(comment.childComments)
            delete comment.childComments
          }

          this.setData({ commentsShow })
        }
      }
    },
  },

  data: {
    commentsShow: []
  },

  methods: {
    initialize(){
      this.data.initialized = true
    },

    // 通知上层关闭评论列表
    hideCommentPopup(){
      this.triggerEvent('hideCommentPopup')
    },

    // 显示评论输入框
    showCommentInputPopup(e){
      this.triggerEvent('showCommentInputPopup', e.target.dataset.replyto)
    },

    // 切换点赞状态
    switchStarStatus(e){
      this.triggerEvent('switchStarStatus', e.target.dataset.starto)
    },

  },

  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
