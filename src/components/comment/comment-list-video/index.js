import { animateTo } from '@/components/common/utils';
import CommentCursorDataDelegator from './assets/commentCursorDataDelegator.js'
import CursorData from '@/libs/cursorData/index.js'

const commentCursorData = new CursorData(
  { queryLimit: 100, },
  new CommentCursorDataDelegator ()
)


Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: [],
      observer: "initComments"
    },
  },

  data: {
    commentsShow: [],
  },

  methods: {
    initComments(comments) {
      if (comments.length > 0) {
        this.setData({ commentsShow: comments })

        // 获取每个评论下对应的第二级评论的 DOM 高度
        wx.nextTick(() => {
          wx.createSelectorQuery().in(this).selectAll('.child-comment-wrap').boundingClientRect((rects) => {
            rects.forEach((rect) => {
              const { commentId } = rect.dataset.comment
              this.data.commentsShow.find(n => n.commentId === commentId).animation = animateTo({'height': rect.height}, 0)
            })

            this.setData({ commentsShow: this.data.commentsShow })
          }).exec()
        })
      }
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

    // 加载更多的自评论
    async getMoreChildComments(e) {
      const { comment } = e.currentTarget.dataset
      const { commentsShow } = this.data

      let list = await commentCursorData.batchNext(5)
      list.forEach((n, i) => { if (i !== 0)  n.expandClass = 'expand' })
      let thatComment = commentsShow.find(n => n.commentId === comment.commentId)
      thatComment.childComments = thatComment.childComments.concat(list)

      wx.createSelectorQuery().in(this).selectAll('.child-comment-wrap').boundingClientRect((rects) => {
        const thatRect = rects.find(n => n.dataset.comment.commentId === comment.commentId)
        if (thatRect) {
          thatComment.animation = animateTo({'height': thatRect.height + 380}, 360)
          this.setData({ commentsShow })

          setTimeout(() => {
            wx.createSelectorQuery().in(this).selectAll('.child-comment-wrap').boundingClientRect((rects) => {
              const thatRect = rects.find(n => n.dataset.comment.commentId === comment.commentId)
              if (thatRect) {
                thatComment.animation = animateTo({'height': thatRect.height}, 0)
                this.setData({ commentsShow })
              }
            }).exec()
          }, 450);
        }
      }).exec()
    },
  },

  lifetimes: {
    created() {
    }
  }
})
