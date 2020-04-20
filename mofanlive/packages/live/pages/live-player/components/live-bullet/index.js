import { connectComponent } from "wx-redux"
import { XIMLiveMessage } from '@/im/message'
const { XIMLivePurchasedMessage, XIMLiveBarrageMessage } = XIMLiveMessage
const IM = wx.X.IM

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

let bulletCount = 10
Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {
    bullets: [],

    // 用户动态队列，需要排队的一个个显示，已经显示过的清除
    bulletsToBeShow: [],
  },

  methods: {
    // 监听消息事件
    onMessageEvents(e) {
      IM.onMessage(XIMLivePurchasedMessage, this.onXIMLivePurchasedMessage)
      IM.onMessage(XIMLiveBarrageMessage, this.onXIMLiveBarrageMessage)
    },

    // 取消消息事件监听
    offMessageEvents(e) {
      IM.offMessage(XIMLivePurchasedMessage, this.onXIMLivePurchasedMessage)
      IM.offMessage(XIMLiveBarrageMessage, this.onXIMLiveBarrageMessage)
    },

    onXIMLivePurchasedMessage(message) {},
    onXIMLiveBarrageMessage(message) {},

    // 清理已经完成动画的弹幕
    cleanBullets() {
      let { bullets } = this.data
      bullets = bullets.filter(bullet => Date.now() - bullet.t < 6000)
      this.data.bullets = bullets
    },

    // 添加弹幕，先存到队列，再一个个取出来
    addBulletToBeShow() {
      let bullet = {
        avatar: 'https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg',
        productImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576773115929&di=57029d59f779b34556bcd18d6e872bd3&imgtype=0&src=http%3A%2F%2Fp0.meituan.net%2Fmogu%2F259dbe4529283e167148ee1c36a491a1129748.jpg',
        userName: 'Jack',
        text: '这是一条弹幕' + bulletCount++,
        // t: Date.now(),
      }

      this.data.bulletsToBeShow.push(bullet)
      this.bulletsInterval()
    },

    // 弹幕轮询
    bulletsInterval(e) {
      if (!this.data.bulletsInterval) {
        this.data.bulletsInterval = setInterval(() => {
          const { bullets, bulletsToBeShow } = this.data

          if (bulletsToBeShow.length > 0) {
            // 获取数组 bullets 中倒数第三个弹幕
            let thatBullet = bullets[bullets.length - 3]

            if (!thatBullet || Date.now() - thatBullet.t > 3000) {
              this.processBullets()
            }
          } else {
            clearInterval(this.data.bulletsInterval)
            this.data.bulletsInterval = null
          }
        }, 100);
      }
    },

    // 处理弹幕
    processBullets() {
      let { bullets } = this.data
      let bullet = this.data.bulletsToBeShow.shift()

      bullet.t = Date.now()
      bullets.push(bullet)
      this.setData({ bullets })
    },
  },

  lifetimes: {
    attached: function () {
      this.onMessageEvents()

      this.addBulletToBeShow()
      setInterval(() => {
        this.addBulletToBeShow()
      }, 5000);
    },

    detached: function () {
      this.offMessageEvents()
    },
  },
}))