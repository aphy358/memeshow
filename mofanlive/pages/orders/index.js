import _ from 'lodash'

import { orders } from '@/data/order'

Page({
  data: {
    type: 'all',
    orders: {
      list: []
    },
  },

  onLoad(options) {
    this.data.type = options.type
  },

  onReady() {
    // TODO use real Data
    _.forEach(orders, order => {
      order.quantity = _.reduce(order.items, (res, item) => {
        return res + item.quantity
      }, 0)
    })
    this.setData({
      "orders.list": orders
    })
  }
})