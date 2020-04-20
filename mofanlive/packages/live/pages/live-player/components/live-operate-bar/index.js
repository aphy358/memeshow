import { connectComponent } from "wx-redux"
import { XIMLiveMessage } from '@/im/message'
const { 
  XIMLiveIntroduceProductMessage,
} = XIMLiveMessage

let icon = 1
const IM = wx.X.IM

const mapStateToProps = state => ({
  products: state.livePlayer.products,
})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    introduceProductMessage: {
      type: Object,
      value: null,
      observer: 'onXIMLiveIntroduceProductMessage'
    },
  },

  data: {
    isRecordVoice: false,

    isShowShareChoice: false,

    popStars: [],

    starCount: 10089,

    // 是否显示海报弹框
    ifShowPoster: false,

    // 是否显示正在讲解弹出层
    introduceProductVisible: false,

    // 正在讲解的商品
    introduceProduct: null,
    
    shareImg: 'https://mofanshow-avatar-1252461817.cos.ap-guangzhou.myqcloud.com/5f46e1c5-cf08-dd38-b7dd-bd666c5089bd.png'
  },

  methods: {

    // 添加设置讲解商品消息
    onXIMLiveIntroduceProductMessage(message) {
      const { fromName, fromAvatar, productId, roomId } = message
      const { products } = this.data
      const thatProduct = products.find(n => n.id === productId)

      if (thatProduct) {
        const introduceProduct = {
          productId,
          roomId,
          image: thatProduct.image
        }
        this.setData({ introduceProductVisible: true, introduceProduct })
      }
    },
    
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
      this.triggerEvent('openProductsPopup')
    },

    emitCoupons() {
      this.triggerEvent('openCouponPopup')
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
    },

    /**
     * 点击正在讲解
     */
    handleTapBuy(e) {
      const { introduceProduct: { productId } } = this.data
      this.triggerEvent("buy", { id: productId })
      this.setData({ introduceProductVisible: false })
    },

    // 初始化消息事件
    onMessageEvents(e) {
      IM.onMessage(XIMLiveIntroduceProductMessage, this.onXIMLiveIntroduceProductMessage.bind(this))
    },

    // 取消消息事件监听
    offMessageEvents(e) {
      IM.onMessage(XIMLiveIntroduceProductMessage, this.onXIMLiveIntroduceProductMessage.bind(this))
    },
  },

  lifetimes: {
    ready() {
    },
    attached() {
      this.onMessageEvents()
      // this.fakeTapStar()
    },
    detached() {
      this.offMessageEvents()
    }
  },
}))