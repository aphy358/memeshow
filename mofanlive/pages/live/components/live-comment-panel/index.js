import { connect } from "libs/redux/index.js"
import { animateTo } from 'libs/utils.js'
const app = getApp()
const store = app.store

let id = 10
let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {

  },

  data: {
    comments: [
      {
        id: 1,
        name: 'Joker',
        text: '想要购买，价格如何？想要购买，价格如何？想要购买，价格如何？'
      },
      {
        id: 2,
        name: 'Joker',
        text: '呵呵'
      },
      {
        id: 3,
        name: 'Joker',
        text: '呵呵'
      },
      {
        id: 4,
        name: 'Joker',
        text: '呵呵'
      },
      {
        id: 5,
        name: 'Joker',
        text: '呵呵'
      },
    ],

    toView: null,

    welcome: {
      name: '随缘',
      animation: null
    },

    recommendAnimation: null
  },

  methods: {
    scrollComment(e) {
      clearTimeout(this.data.scrollTimeOut)
      this.data.scrolling = true
      this.data.scrollTimeOut = setTimeout(() => {
        this.data.scrolling = false
      }, 2000);
    },

    showWelcomeTip() {
      let { welcome } = this.data

      welcome.name = '随缘' + id
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

    addComment() {
      let { comments } = this.data

      let comment = {
        id: id++,
        name: 'Rita',
        text: '猪猪侠飞过来了～'
      }

      comments.push(comment)
      this.setData({ comments })

      if (!this.data.scrolling) {
        setTimeout(() => {
          this.setData({ toView: 'commentItem' + comment.id })
        }, 100);
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
      setInterval(() => {
        this.addComment()
      }, 3000);

      setInterval(() => {
        this.showWelcomeTip()
      }, 4000);

      setInterval(() => {
        this.showRecommend()
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
