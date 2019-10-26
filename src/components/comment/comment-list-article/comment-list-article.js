import { throttle } from '../../common/utils'
import _ from 'lodash'

Component({
  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: [],
      observer(newVal) {
        throttle(this.commentsChanged.bind(this), 50)()
      }
    },

    // 被回复的评论在所有评论的下标
    dataindex: {
      type: Number | String,
      value: -1,
      observer(newVal) {
        throttle(this.commentsChanged.bind(this), 50)()
      }
    },
  },

  data: {
    commentsShow: []
  },

  methods: {
    // 当评论变化时触发
    commentsChanged(){
      const { dataindex, comments } = this.data
      let commentsShow = []

      if(dataindex > -1 && comments.length > 0){
        let comment = _.cloneDeep(comments[+dataindex])
        commentsShow = [comment]
        if(comment.childComments){
          commentsShow = commentsShow.concat(comment.childComments)
          delete comment.childComments
        }
      }

      this.setData({ commentsShow })
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
    }
  }
})
