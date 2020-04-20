import { OrderStateText, OrderListActions } from '@/constants/merchant-order'
import _ from 'lodash'
const Api = wx.X.Api

/**
 * 订单或退货单 item
 */
Component({
  properties: {
    order: {
      type: Object,
      value: {},
    },
  },

  data: {
    OrderStateText,
    OrderListActions,
  },

  methods: {
  },

  lifetimes: {
    ready() {
    }
  },

  options: {
    addGlobalClass: true
  }
})