import _ from 'lodash'

const timer = wx.X.timer

import { orders } from '@/data/order'

Component({
  data: {
    current: 'all',
    types: [
      {
        title: "全部",
        key: "all",
      },
      {
        title: "待付款",
        key: "unpaid",
      },
      {
        title: "待发货",
        key: "undeliver",
      },
      {
        title: "待收货",
        key: "delivering",
      },
      {
        title: "售后",
        key: "refund",
      },
    ],
    orders: {
      list: []
    },
  },

  lifetimes: {
    ready() {
      // TODO use real Data
      _.forEach(orders, order => {
        order.quantity = _.reduce(order.items, (res, item) => {
          return res + item.quantity
        }, 0)
      })
      this.setData({
        "orders.list": orders,
        current: this.data.current
      })

      timer.add('orders', 100)
    },
    detached() {
      timer.clear('orders')
    }
  },

  methods: {
    onTabChange(e) {
      console.log(e)
    },
    onLoad(e) {
      this.setData({
        current: e.type
      })
    },
  },

  options: {
    addGlobalClass: true
  }
})