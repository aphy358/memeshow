import { connect } from "libs/redux/index.js"
import { animateTo } from 'libs/utils.js'

const app = getApp()
const store = app.store


let bulletCount = 10
let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {

  },

  data: {
    bullets: [
    ],
  },

  methods: {
    // 清理已经完成动画的弹幕
    cleanBullets() {
      let { bullets } = this.data
      bullets = bullets.filter(bullet => Date.now() - bullet.timeStamp < 6000)
      this.data.bullets = bullets
    },

    addBullet() {
      let { bullets } = this.data

      bullets.push({
        avatar: 'https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg',
        userName: 'Joker',
        text: '这是一条弹幕' + bulletCount++,
        timeStamp: Date.now(),
        style: 'top: calc(20% + ' + Math.random() * 10 + '*10px);'
      })

      this.setData({ bullets })
    }
  },

  lifetimes: {
    detached: function () {
    },
    
    attached: function () {
      setInterval(() => {
        this.addBullet()
      }, 2000);
    },
  },
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)