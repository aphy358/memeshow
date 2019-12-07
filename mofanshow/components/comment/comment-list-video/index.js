import { safeArea } from "behaviors/index"
import { switchStarStatus, addNewComment } from '@/components/comment/commentHelper.js'
import { animateTo } from 'libs/utils.js';
import CommentCursorDataDelegator from './assets/commentCursorDataDelegator.js'
import CursorData from 'libs/cursorData/index.js'

const commentCursorData = new CursorData(
  { queryLimit: 10 },
  new CommentCursorDataDelegator ()
)

Component({
  behaviors: [safeArea()],

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

    // 评论数据源
    show: {
      type: Boolean,
      value: false,
      observer: "toggleCommentPopup"
    },
  },

  data: {
    commentsShow: [],
    scrollIntoView: '',

    // 评论上面占位元素的高度
    commentPHolderTop: 0,

    // 评论下面占位元素的高度
    commentPHolderBottom: 0,

    // 是否正在加载更多评论
    loadingComments: false,

    // 保存最近一次的评论框 scrollTop
    scrollTop: 0,
  },

  methods: {
    // 评论弹框的显示与隐藏
    toggleCommentPopup(isShow) {
      // 每次评论框弹起的时候，都要获取每条评论的高度值，以便后续做大列表优化时使用
      if (isShow) {
        setTimeout(() => {
          this.setItemHeight()
        }, 500);
      }
    },

    initComments(comments) {
      if (comments.length > 0) {
        // 这里给每条一级评论添加 startIndex 和 endIndex 属性，用于标记当前显示在页面的子评论下标
        // 因为随着子评论的收起和展开，并不是所有子评论都会显示在页面
        comments.forEach(n => {
          // 显示的子评论所处子评论数组的起始下标
          n.startIndex = 0
          // 显示的子评论所处子评论数组的终止下标
          n.endIndex = 0
        })

        this.setData({ commentsShow: comments })

        // 获取每个评论下对应的第二级评论的 DOM 高度
        wx.nextTick(() => {
          wx.createSelectorQuery().in(this).selectAll('.child-comment-wrap').boundingClientRect((rects) => {
            rects.forEach((rect) => {
              const { commentId } = rect.dataset.comment
              let thatComment = this.data.commentsShow.find(n => n.commentId === commentId)
              thatComment.animation = animateTo({'height': rect.height}, 0)
              // 记录子评论的初始高度，后续收起子评论的时候按照这个高度来动画
              thatComment.initHeight = rect.height
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

    // 点击了小红心，切换点赞状态
    switchStarStatus(e){
      const { commentId } = e.currentTarget.dataset.starto
      let { commentsShow } = this.data

      commentsShow = switchStarStatus(commentsShow, commentId)
      this.setData({ commentsShow })
    },

    // 收起/加载更多评论
    toggleChildCommentExpand(e) {
      const { comment } = e.currentTarget.dataset
      const { commentsShow } = this.data
      let thatComment = commentsShow.find(n => n.commentId === comment.commentId)

      if (thatComment.endIndex >= thatComment.childCommentCount - 1) {
        // 子评论已经全部加载完毕，再点击则是收起
        this.slideUpChildComments(thatComment)
      } else {
        // 子评论还未加载完毕，再点击则是继续加载
        this.getMoreChildComments(thatComment)
      }
    },

    // 收起子评论
    slideUpChildComments(thatComment) {
      const { commentsShow } = this.data

      wx.createSelectorQuery().in(this).selectAll('.child-comment-wrap').boundingClientRect((rects) => {
        const thatRect = rects.find(n => n.dataset.comment.commentId === thatComment.commentId)
        if (thatRect) {
          thatComment.animation = animateTo({'height': thatComment.initHeight}, 360)
          this.setData({ commentsShow, scrollIntoView: 'commentMore' + thatComment.commentId })

          setTimeout(() => {
            thatComment.endIndex = 0
            this.setData({ commentsShow })
            this.setItemHeight()
            setTimeout(() => {
              // 收缩子评论不会触发 scroll，这里需要手动执行大列表函数，以避免可视区出现空白
              this.bigListScroll(this.data.scrollTop)
            }, 100);
          }, 400);
        }
      }).exec()
    },

    // 加载更多的自评论
    async getMoreChildComments(thatComment) {
      const { commentsShow } = this.data

      // 显示 '加载中' 动画
      thatComment.loadingChildComments = true
      this.data.loadingComments = true
      this.setData({ commentsShow })

      if (thatComment.childComments.length < thatComment.childCommentCount) {
        if (typeof thatComment.commentCursorData === 'undefined'){
          thatComment.commentCursorData = new CursorData(
            { queryLimit: 10, parentId: thatComment.commentId },
            new CommentCursorDataDelegator ()
          )
        }

        let list = await thatComment.commentCursorData.batchNext(5)
        // toBeExpand，将要动画，做一个标记，后续给这些元素加上相对应的类名即可开启动画
        list.forEach((n, i) => { if (i !== 0)  n.toBeExpand = true })
        thatComment.childComments = thatComment.childComments.concat(list)
      }

      // 先让新加载的子评论在页面中显示出来（此时仍被父元素遮罩住）
      thatComment.endIndex += 5
      thatComment.loadingChildComments = false
      this.data.loadingComments = false
      this.setData({ commentsShow })

      wx.createSelectorQuery().in(this).selectAll('.child-comment-wrap').boundingClientRect((rects) => {
        const thatRect = rects.find(n => n.dataset.comment.commentId === thatComment.commentId)
        if (thatRect) {
          thatComment.childComments.forEach((n, i) => { 
            // 只给需要动画的子评论元素加上相关类名
            if (n.toBeExpand && i > thatComment.endIndex - 5) n.expandClass = 'expand' 
          })
          thatComment.animation = animateTo({'height': thatRect.height})
          this.setData({ commentsShow })

          // 动画结束后去除相关元素上的类名
          setTimeout(() => {
            thatComment.childComments.forEach(n => { if (n.toBeExpand) n.expandClass = '' })
            this.setData({ commentsShow })
            this.setItemHeight()
          }, 350);
        }
      }).exec()
    },

    // 评论区滚动到底部时
    async scrolltolower(e) {
      // 如果当前正在加载评论，并且尚未返回结果，则直接 return
      if (this.data.loadingComment) return

      let { commentsShow } = this.data
      this.data.loadingComment = true
      let list = await commentCursorData.batchNext(10)
      commentsShow = commentsShow.concat(list)
      this.setData({ commentsShow })
      this.data.loadingComment = false

      wx.nextTick(() => {
        this.setItemHeight()
      })
    },

    // 滚动评论
    scrollComment(e) {
      if (this.data.loadingComments) return

      let _now = +new Date()
      
      // 节流控制
      if (
        (this.data.commentThrottle && _now - this.data.commentThrottle > 300) || 
        !this.data.commentThrottle
      ) {
        this.data.commentThrottle = _now
        this.bigListScroll(e.detail.scrollTop)
      }
    },

    // 大列表优化
    bigListScroll(scrollTop) {
      this.data.scrollTop = scrollTop   // 在做减运算之前先保存起来，后续收缩某个子列表时会用到
      let { commentsShow } = this.data
      let pholder1 = 0            // 评论列表上面的占位元素
      let pholder2 = 0            // 评论列表下面的占位元素

      // 如果因为某条新增评论还没来得及保存它的高度，则 return
      commentsShow.forEach(n => { if( !n.itemHeight ) return })

      // 评论弹框上下各预留 500px 的内容显示出来，其他的隐藏
      for (let i = 0; i < commentsShow.length; i++) {
        const comment = commentsShow[i]
        
        // 如果整条一级评论（连带它的子评论）都超出顶部 500px 以上或者都超出底部 500px 以上，则隐藏该条一级评论（连带它的子评论）
        if (scrollTop - comment.itemHeight > 500 || scrollTop < -1000) {
          scrollTop -= comment.itemHeight
          scrollTop < -1000
            ? pholder2 += comment.itemHeight
            : pholder1 += comment.itemHeight

          // 将该评论设置为隐藏，其子评论隐藏标记清楚
          comment.hide = 'hide'
        } else {
          // 如果某条评论只是部分处在可视区
          comment.hide = ''
          scrollTop -= comment.itemHeight
        }
      }

      this.setData({
        commentPHolderTop: pholder1,
        commentPHolderBottom: pholder2,
        commentsShow
      })
    },

    // 设置每条评论的高度（包括一级评论和二级评论）
    setItemHeight(e) {
      let { commentsShow } = this.data

      wx.createSelectorQuery().in(this).selectAll('.big-list-selector').boundingClientRect(rects => {
        rects.forEach(rect => {
          let level = +rect.dataset.level
          let commentId = rect.dataset.comment.commentId

          for (let i = 0; i < commentsShow.length; i++) {
            const comment = commentsShow[i]

            if (comment.commentId === commentId) {
              level === 1
                ? comment.itemHeight = rect.height        // 一级评论整体外框的高度
                : comment.ownHeight = rect.height         // 一级评论自身的高度（不含子评论高度）

              break;

            } else {
              for (let j = 0; j < comment.childComments.length; j++) {
                const childComment = comment.childComments[j]
                
                if (childComment.commentId === commentId) {
                  childComment.itemHeight = rect.height
                  break;
                }
              }
            }
          }
        })

        this.setData({ commentsShow })

      }).exec()
    },
  },

  lifetimes: {
    created() {
    }
  }
})
