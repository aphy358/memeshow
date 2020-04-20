import { connectComponent } from "wx-redux"
import { XIMLiveMessage } from '@/im/message'
const { XIMLivePurchasedMessage } = XIMLiveMessage
const IM = wx.X.IM

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
    joinOrder: null,

    // 待显示拼单队列，需要排队的一个个显示，已经显示过的清除
    joinOrders: [],
  },

  methods: {
    // 添加下单了消息
    onXIMLivePurchasedMessage(message) {
      const { products, fromName, fromAvatar } = message

      for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const joinOrder = {
          name: fromName,
          content: '一件商品',
          img: product.imgUrl,
          t: 0,
          id: product.productId,
        }
        
        // 添加到轮询数组，并开启轮询
        this.data.joinOrders.push(joinOrder)
        this.joinOrderInterval()
      }
    },

    // 拼单轮询
    joinOrderInterval(e) {
      if (!this.data.joinOrderInterval) {
        this.data.joinOrderInterval = setInterval(() => {
          const { joinOrder, joinOrders } = this.data

          if (joinOrders.length > 0) {
            if (!joinOrder || Date.now() - joinOrder.t > 5000) {
              this.processJoinOrders()
            }
          } else {
            clearInterval(this.data.joinOrderInterval)
            this.data.joinOrderInterval = null
          }
        }, 100);
      }
    },

    // 处理拼单
    processJoinOrders() {
      this.setData({ joinOrder: null })

      let joinOrder = this.data.joinOrders.shift()
      joinOrder.t = Date.now()
      this.setData({ joinOrder })
    },

    /**
     * 拼单购买
     * @param {event} e 
     */
    handleTapBuy(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent("buy", {
        id
      })
    },

    // 初始化消息事件
    onMessageEvents(e) {
      IM.onMessage(XIMLivePurchasedMessage, this.onXIMLivePurchasedMessage.bind(this))
    },

    // 取消消息事件监听
    offMessageEvents(e) {
      IM.offMessage(XIMLivePurchasedMessage, this.onXIMLivePurchasedMessage.bind(this))
    },

  },

  lifetimes: {
    attached: function () {
      this.onMessageEvents()
    },

    detached: function () {
      this.offMessageEvents()
    },
  },
}))