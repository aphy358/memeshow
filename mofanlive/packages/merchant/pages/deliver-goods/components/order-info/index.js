import { OrderStateText, OrderListActions } from '@/constants/merchant-order'
import _ from 'lodash'
const Api = wx.X.Api
const router = wx.X.router

const OIS = {
  "refunding": "正在退款"
}

/**
 * 订单或退货单 item
 */
Component({
  properties: {
    order: {
      type: Object,
      value: {},
      observer: async function (newVal) {
        if (newVal && newVal.id) {
          const res = await Api.MerchantOrder.retrieveDeliveryItems(newVal.id)
          res.selectAll = res.items.every(n => n.canDeliverNum > 0)
          res.selectAllDisable = !res.selectAll
          res.items.forEach(n => n.selected = n.canDeliverNum > 0 ? true : false);
          res.totalNum = res.items.reduce((total, item) => total + item.num, 0)

          this.setData({ orderToShow: res })
          this.triggerEvent('selectChange', res)
        }
      }
    },
  },

  data: {
    OIS,
    OrderStateText,
    OrderListActions,

    orderToShow: null
  },

  methods: {
    switchSelectAll({ detail: { checked } }) {
      let { orderToShow } = this.data
      orderToShow.selectAll = checked
      orderToShow.items.forEach(n => n.selected = checked)
      this.setData({ orderToShow })
      this.triggerEvent('selectChange', orderToShow)
    },

    switchSelectItem({ detail: { checked }, currentTarget: { dataset: { item } } }) {
      let { orderToShow } = this.data

      orderToShow.items.forEach(n => {
        if (n.skuId === item.skuId) {
          n.selected = checked
        }
      })
      orderToShow.selectAll = orderToShow.items.every(n => n.selected)

      this.setData({ orderToShow })
      this.triggerEvent('selectChange', orderToShow)
    },
    navToDeliveryDetail() {
      router.go("deliveryDetail")
    },
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },

  options: {
    addGlobalClass: true
  }
})