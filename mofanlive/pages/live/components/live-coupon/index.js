import { connectComponent } from "wx-redux"
import computedBehavior from 'miniprogram-computed'

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

  lifetimes: {
    ready() {
    },
    attached() {
      setTimeout(() => {
        this.setData({ couponClazz: 'coupon-animate-1' })
        this.setCouponInterval()
      }, 2000);
    },
    detached() {
    }
  },
}))