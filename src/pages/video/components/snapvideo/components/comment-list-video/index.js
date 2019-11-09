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

  },

  methods: {
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

  }
})
