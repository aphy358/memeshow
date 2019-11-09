import { switchStarStatus, addNewComment } from '@/components/comment/commentHelper.js'

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
      const commentId = e.detail.commentId || e.currentTarget.dataset.starto.commentId
      let { comments } = this.data

      comments = switchStarStatus(comments, commentId)
      this.setData({ comments })
    },

    // 弹出评论输入框
    showCommentInputPopup(e){
      let _this = this

      // 弹起键盘之前先记录页面的滚动位置，等键盘收起等时候再滚到原来的位置
      const query = wx.createSelectorQuery()
      query.select('.article-wrap').boundingClientRect()
      query.exec(function(res){
        _this.data.scrollTop = Math.abs(res[0].top)
        
        _this.setData({ 
          ifShowCommentInputPopup: true,
          replyTo: e.detail.nickName ? e.detail : e.currentTarget.dataset.replyto
        })
      })
    },

    // 隐藏评论输入框
    hideCommentInputPopup(e){
      // 键盘收起之后，要将页面滚动到键盘弹起之前的那个位置
      if(this.data.scrollTop != null){
        wx.pageScrollTo({
          scrollTop: this.data.scrollTop,
          duration: 300
        })
      }

      this.setData({ ifShowCommentInputPopup: false })
    },

    // 创建一条新的评论
    createNewComment(e){
      // 拿到新创建的评论，先将它插入到之前的数据列表中，然后存数据库？
      let { comments } = this.data
      const newComment = e.detail

      comments = addNewComment(comments, newComment)
      this.setData({ comments })
    },
  },

  lifetimes: {
    ready() {

    }
  }
})
