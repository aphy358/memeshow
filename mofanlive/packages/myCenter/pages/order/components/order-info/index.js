import { OAK } from '@/constants/order'
import { PaymentTypeMapping } from '@/constants/payment-type'

Component({
  properties: {
    orderDetail: {
      type: Object,
      value: {}
    },
  },

  data: {
    OAK,
    PaymentTypeMapping,
  },

  methods: {
    copy() {
      wx.setClipboardData({
        data: this.data.orderDetail.id
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})
