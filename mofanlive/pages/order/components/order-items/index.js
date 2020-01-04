import _ from 'lodash'

Component({
  properties: {
    items: {
      type: Object,
      value: []
    },
    orderId: {
      type: String,
      value: ""
    },
    postage: {
      type: Number,
      value: 0
    },
    amount: {
      type: Number,
      value: 0
    }
  },

  data: {
    totalQuantity: 0
  },

  methods: {
    emitRefund(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent("refund", {
        ...this.data.items[index],
        orderId: this.data.orderId
      })
    }
  },

  observers: {
    items(items) {
      this.setData({
        totalQuantity: _.reduce(items, (res, item) => {
          return res + item.quantity
        }, 0)
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})