import { connectComponent } from "wx-redux"

let icon = 1

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {
    isRecordVoice: false,

    isShowShareChoice: false,

    popStars: [],

    starCount: 10089,

    // 是否显示海报弹框
    ifShowPoster: false
  },

  methods: {
    // 发送语音
    sendVoice(e) {
      this.setData({ isRecordVoice: false })
    },

    // 开始录音
    recordVoice(e) {
      this.setData({ isRecordVoice: true })
    },

    addStarCount(addon) {
      if (typeof addon === 'undefined') addon = 1
      let { starCount } = this.data
      starCount = starCount + addon
      this.setData({ starCount })
    },

    addPopStars() {
      // 每次生成 10 ~ 13 个心心
      let starNumber = Math.floor(Math.random() * 10) % 4 + 10

      for (let i = 0; i < starNumber; i++) {
        let timeDelay = Math.floor(Math.random() * 100) + 100 * i

        setTimeout(() => {
          let { popStars } = this.data
          let rotate = 14 - Math.floor(Math.random() * 28)
          let left = Math.floor(Math.random() * 40) - 20
          let diameter = Math.floor(Math.random() * 20) + 60
          let t = Date.now()

          popStars.push({
            t,
            rotate,
            clazz: Math.floor(Math.random() * 10) % 3,
            icon: (icon++ % 2),
            left,
            diameter
          })

          // 限制心心个数，当个数大于 100 的时候，清理一下
          if (popStars.length > 100) {
            popStars = popStars.filter(n => n.t + 2000 > t)
          }

          this.setData({ popStars })
        }, timeDelay);
      }
    },

    // 点击了点赞，冒出很多心心
    tapStar() {
      let _now = Date.now()
      let timeGap = 1000

      this.addStarCount()

      // 节流控制
      if (
        (this.popStarThrottle && _now - this.popStarThrottle > timeGap) ||
        !this.popStarThrottle
      ) {
        this.popStarThrottle = _now
        this.addPopStars()
      }
    },

    // 显示分享选择弹框
    showShareChoicePop(e) {
      this.setData({ isShowShareChoice: true })
    },

    // 隐藏分享选择弹框
    hideShareChoicePop(e) {
      this.setData({ isShowShareChoice: false })
    },

    // 显示海报弹框
    showPosterPop(e) {
      this.setData({ ifShowPoster: true })
      this.hideShareChoicePop()
    },

    // 隐藏海报弹框
    hidePosterPop(e) {
      this.setData({ ifShowPoster: false })
    },

    // 跳转到订单
    emitOrders() {
      this.triggerEvent("orders")
    },

    emitProducts() {
      this.emitList('product')
    },

    emitCoupons() {
      this.emitList('coupon')
    },

    // 弹出列表弹窗
    emitList(key) {
      this.triggerEvent('list', {
        key
      }, {
        bubbles: true
      })
    },

    // 假装点赞，人生如戏，全靠演技
    fakeTapStar() {
      let gap = Math.floor(Math.random() * 1000) + 1000
      let addon = Math.floor(Math.random() * 10) % 6

      setTimeout(() => {
        this.addStarCount(addon)
        this.tapStar()
        this.fakeTapStar()
      }, gap);
    },

    showCommentInputPopup(e) {
      this.triggerEvent('onShowCommentInputPopup')
    }
  },

  lifetimes: {
    ready() {
    },
    attached() {
      this.fakeTapStar()
    },
    detached() {
    }
  },
}))