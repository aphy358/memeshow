import address from "@/data/address"
import _ from 'lodash'

Component({
  properties: {
    open: {
      type: Boolean,
      value: false,
    },
    trades: {
      type: Object,
      value: []
    }
  },

  data: {
    address: {}
  },

  methods: {
    changeAddress(e) {
      console.log(e)
      this.setData({
        address: address[0]
      })
    },

    /**
     * 提交订单
     * @param {event} e 
     */
    handleConfirm(e) {
      console.log(e)
    },

    /**
     * 
     */
    emitCancel() {
      this.triggerEvent('cancel')
    },

    emitCoupon(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent('coupon', {
        id,
        detail: {
          key: 'coupon'
        }
      })
    }
  },

  lifetimes: {
    attached() {
      this.setData({
        address
      })
    }
  },

  options: {
    addGlobalClass: true,
  }
})
