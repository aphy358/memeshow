import { connectComponent } from "wx-redux"
import { IMTextMessage } from 'im/message'
import { XIMLiveMessage } from '@/im/message'
const {
  XIMLivePurchasingMessage,
  XIMLiveEnterRoomMessage,
  XIMLiveSubscribeMessage,
  XIMLivePurchasedMessage,
  XIMLiveShareLiveMessage,
  XIMLiveGiftMessage,
  XIMLiveCouponMessage,
  XIMLiveBarrageMessage
} = XIMLiveMessage

const IM = wx.X.IM

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    textMessage: {
      type: Object,
      value: null,
      observer: 'onIMTextMessage'
    },
  },

  data: {
    toView: 'listBottom',

    userTrend: null,

    // 用户动态队列，需要排队的一个个显示，已经显示过的清除
    userTrends: [],

    // 所有评论
    comments: [],
  },

  methods: {
    addUserTrendsMessage(message, type = -1) {
      const { fromName, fromAvatar } = message
      const userTrend = {
        type,
        name: fromName,
        avatar: fromAvatar,
        t: 0
      }

      // 将用户动态添加进轮询数组，并开始轮询
      this.data.userTrends.push(userTrend)
      this.trendsInterval()
    },

    scrollComment(e) {
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

    // 新增文本消息
    onIMTextMessage(message) {
      let { comments } = this.data
      const comment = {
        fromAvatar: message.fromAvatar,
        fromName: message.fromName,
        text: message.text,
      }

      comments = comments.concat(comment)
      this.setData({ comments })
      this.data.addingComment = true

      // 将评论框内容滑倒最底部
      if (!this.data.scrolling) {
        setTimeout(() => {
          this.setData({ toView: 'listBottom' })
        }, 500);
      }
    },

    // ‘下单了’ 消息
    onXIMLivePurchasedMessage(message) {
      this.addUserTrendsMessage(message, 8)
    },

    // 添加购物车消息
    onXIMLivePurchasingMessage(message) {
      this.addUserTrendsMessage(message, 7)
    },

    // 加入直播间消息
    onXIMLiveEnterRoomMessage(message) {
      const { payload: { channel } } = message

      let type = -1
      switch (channel) {
        case 'weixinApp': {
          type = 1
          break;
        }
        default: {
        }
      }

      this.addUserTrendsMessage(message, type)
    },

    // 添加弹幕消息，要添加两条消息：一条弹幕消息，一条文本消息
    onXIMLiveBarrageMessage(message) {
      // TODO 添加弹幕
    },

    // 关注
    onXIMLiveSubscribeMessage(message) {},

    // 分享直播间
    onXIMLiveShareLiveMessage(message) {},

    // 打赏
    onXIMLiveGiftMessage(message) {},

    // 优惠券
    onXIMLiveCouponMessage(message) {},

    // 初始化消息事件
    onMessageEvents(e) {
      IM.onMessage(IMTextMessage, this.onIMTextMessage.bind(this))
      IM.onMessage(XIMLiveEnterRoomMessage, this.onXIMLiveEnterRoomMessage.bind(this))
      IM.onMessage(XIMLiveSubscribeMessage, this.onXIMLiveSubscribeMessage.bind(this))
      IM.onMessage(XIMLivePurchasingMessage, this.onXIMLivePurchasingMessage.bind(this))
      IM.onMessage(XIMLivePurchasedMessage, this.onXIMLivePurchasedMessage.bind(this))
      IM.onMessage(XIMLiveShareLiveMessage, this.onXIMLiveShareLiveMessage.bind(this))
      IM.onMessage(XIMLiveGiftMessage, this.onXIMLiveGiftMessage.bind(this))
      IM.onMessage(XIMLiveCouponMessage, this.onXIMLiveCouponMessage.bind(this))
      IM.onMessage(XIMLiveBarrageMessage, this.onXIMLiveBarrageMessage.bind(this))
    },

    // 取消消息事件监听
    offMessageEvents(e) {
      IM.offMessage(IMTextMessage, this.onIMTextMessage.bind(this))
      IM.offMessage(XIMLiveEnterRoomMessage, this.onXIMLiveEnterRoomMessage.bind(this))
      IM.offMessage(XIMLiveSubscribeMessage, this.onXIMLiveSubscribeMessage.bind(this))
      IM.offMessage(XIMLivePurchasingMessage, this.onXIMLivePurchasingMessage.bind(this))
      IM.offMessage(XIMLivePurchasedMessage, this.onXIMLivePurchasedMessage.bind(this))
      IM.offMessage(XIMLiveShareLiveMessage, this.onXIMLiveShareLiveMessage.bind(this))
      IM.offMessage(XIMLiveGiftMessage, this.onXIMLiveGiftMessage.bind(this))
      IM.offMessage(XIMLiveCouponMessage, this.onXIMLiveCouponMessage.bind(this))
      IM.offMessage(XIMLiveBarrageMessage, this.onXIMLiveBarrageMessage.bind(this))
    },
  },

  ready() {
  },

  lifetimes: {
    attached() {
      this.onMessageEvents()
    },

    detached() {
      this.offMessageEvents()
    },
  }
}))
