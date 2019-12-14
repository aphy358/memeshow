import { connect } from "libs/redux/index.js"
import { animateTo } from 'libs/utils.js'

import _comments from './_comments'

import BigListScroller from 'libs/bigListScroller/index.js'
const liveBigListScroller = new BigListScroller({
  dataList: 'comments',
  itemSelector: '.comment-item',
  listHeight: 300
})

let id = 10
let componentConfig = {
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

    welcome: {
      name: '随缘',
      animation: null
    },

    recommendAnimation: null,
  },

  methods: {
    scrollComment(e) {
      liveBigListScroller.scrollList(e, this.data.scrolling)
      
      clearTimeout(this.data.scrollTimeOut)
      this.data.scrolling = true
      this.data.scrollTimeOut = setTimeout(() => {
        this.data.scrolling = false
      }, 2000);
    },

    showWelcomeTip() {
      let { welcome } = this.data

      welcome.name = '随缘' + id++
      welcome.animation = animateTo({'translateX': '0%'})
      this.setData({ welcome })

      setTimeout(() => {
        this.hideWelcomeTip()
      }, 2000);
    },

    hideWelcomeTip() {
      let { welcome } = this.data
      welcome.animation = animateTo({'translateX': '-100%'})
      this.setData({ welcome })
    },

    addComment(comment) {
      console.log('addComment', comment);
      
      liveBigListScroller.addItems(comment)

      if (!this.data.scrolling) {
        setTimeout(() => {
          this.setData({ toView: 'listBottom' })
        }, 500);
      }
    },

    showRecommend() {
      let { recommendAnimation } = this.data
      recommendAnimation = animateTo({'height': '80px'})
      this.setData({ recommendAnimation })

      setTimeout(() => {
        this.hideRecommend()
      }, 3000);
    },

    hideRecommend() {
      let { recommendAnimation } = this.data
      recommendAnimation = animateTo({'height': '0'})
      this.setData({ recommendAnimation })
    },
  },

  lifetimes: {
    ready() {
      liveBigListScroller.bindContext(this)
      liveBigListScroller.addItems(_comments)

      setInterval(() => {
        // this.addComment()
      }, 2000);

      setInterval(() => {
        // this.showWelcomeTip()
      }, 4000);

      setInterval(() => {
        // this.showRecommend()
      }, 8000);
    },
    detached() {
    },
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)
