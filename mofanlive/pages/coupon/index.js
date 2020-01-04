import { trades } from '@/data/product'

Page({
  data: {
    coupon: []
  },

  onReady() {
    this.setData({
      coupon: trades[0].coupon
    }, () => {
      console.log(this.data.coupon)
    })
  }
})