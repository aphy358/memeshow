import { connectComponent } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
import { XIMLiveMessage } from '@/im/message'
const { XIMLiveCouponMessage } = XIMLiveMessage
const IM = wx.X.IM

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  behaviors: [computedBehavior],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {
    couponClazz: '',

    secondLeft: 5,
  },

  watch: {
    secondLeft(newVal, oldVal) {
      if (newVal <= 0) {
        this.hideCoupon()
      }
    },
  },

  methods: {
    // 初始化消息事件
    onMessageEvents(e) {
      IM.onMessage(XIMLiveCouponMessage, this.onXIMLiveCouponMessage)
    },

    // 取消消息事件监听
    offMessageEvents(e) {
      IM.offMessage(XIMLiveCouponMessage, this.onXIMLiveCouponMessage)
    },

    onXIMLiveCouponMessage(message) {},

    setCouponInterval(e) {
      this.data.couponInterval = setInterval(() => {
        let { secondLeft } = this.data
        if (secondLeft > 0) {
          this.setData({ secondLeft: --secondLeft })
        }
      }, 1000);
    },

    hideCoupon() {
      this.setData({ couponClazz: 'coupon-animate-2' })
      clearInterval(this.data.couponInterval)
      this.data.couponInterval = null
    }

  },

  ready() {
  },

  lifetimes: {
    attached() {
      this.onMessageEvents()

      setTimeout(() => {
        this.setData({ couponClazz: 'coupon-animate-1' })
        this.setCouponInterval()
      }, 2000);
    },

    detached() {
      this.offMessageEvents()
    }
  },
}))