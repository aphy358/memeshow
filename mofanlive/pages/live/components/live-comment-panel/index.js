import { connectComponent } from "wx-redux"
import { animateTo } from 'libs/utils.js'

import _comments from './_comments'

import BigListScroller from 'libs/bigListScroller/index.js'
const liveBigListScroller = new BigListScroller({
  dataList: 'comments',
  itemSelector: '.comment-item',
  listHeight: 300
})

const welcomeColors = ['rgba(202, 35, 46, 0.6)', 'rgba(202, 35, 46, 0.6)']

let id = 10

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 新增评论
    newComment: {
      type: Object,
      value: null,
      observer: 'addComment'
    },
  },

  data: {
    toView: 'listBottom',

    userTrend: null,

    // 用户动态队列，需要排队的一个个显示，已经显示过的清除
    userTrends: [],

    recommendAnimation: null,
  },

  methods: {
    scrollComment(e) {
      liveBigListScroller.scrollList(e, this.data.scrolling)
      if (!this.data.addingComment) {
        clearTimeout(this.data.scrollTimeOut)
        this.data.scrolling = true
        this.data.scrollTimeOut = setTimeout(() => {
          this.data.scrolling = false
        }, 2000);
      } else {
        this.data.addingComment = false
      }
    },

    // 添加用户动态
    addUserTrends() {
      let ran = Math.floor(Math.random() * 8) + 1

      let userTrend = {
        type: ran,
        bgColor: welcomeColors[ran % 2],
        name: '哦破ID旅客' + id++,
        t: 0
      }

      this.data.userTrends.push(userTrend)
      this.trendsInterval()
    },

    // 用户动态轮询
    trendsInterval(e) {
      if (!this.data.trendsInterval) {
        this.data.trendsInterval = setInterval(() => {
          const { userTrend, userTrends } = this.data

          if (userTrends.length > 0) {
            if (!userTrend || Date.now() - userTrend.t > 2000) {
              this.processUserTrends()
            }
          } else {
            clearInterval(this.data.trendsInterval)
            this.data.trendsInterval = null
          }
        }, 100);
      }
    },

    // 处理用户动态
    processUserTrends() {
      this.setData({ userTrend: null })

      let userTrend = this.data.userTrends.shift()
      userTrend.t = Date.now()
      this.setData({ userTrend })
    },

    addComment(comment) {
      liveBigListScroller.addItems(comment)
      this.data.addingComment = true

      if (!this.data.scrolling) {
        setTimeout(() => {
          this.setData({ toView: 'listBottom' })
        }, 500);
      }
    },

    showRecommend() {
      let { recommendAnimation } = this.data
      recommendAnimation = animateTo({ 'height': '160rpx' })
      this.setData({ recommendAnimation })

      setTimeout(() => {
        this.hideRecommend()
      }, 3000);
    },

    hideRecommend() {
      let { recommendAnimation } = this.data
      recommendAnimation = animateTo({ 'height': '0' })
      this.setData({ recommendAnimation })
    },
  },

  ready() {
    liveBigListScroller.bindContext(this)
    liveBigListScroller.addItems(_comments)

    setInterval(() => {
      let type = Math.floor(Math.random() * 3)
      let comment = {
        color: '2',
        nickName: 'Joker',
        comment: '呵呵🐂皮评论',
        type
      }

      this.addComment(comment)
    }, 2000);

    setInterval(() => {
      this.addUserTrends()
    }, 1000);

    setInterval(() => {
      this.showRecommend()
    }, 8000);
  },
  lifetimes: {
    detached() {
    },
  }
}))
