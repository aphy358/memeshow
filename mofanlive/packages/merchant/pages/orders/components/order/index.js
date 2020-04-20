import { connectComponent } from "wx-redux"
import { OAT, OrderStateText, OrderListActions } from '@/constants/merchant-order'
import _ from 'lodash'
import Action from "@/redux/action"
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  async storeMerchantThatOrder() {
    const order = await Api.MerchantOrder.retrieve(this.data.order.id)
    console.log('storeMerchantThatOrder', order);
    dispatch(Action.merchantOrders.updateOrder(order))
  },
  async storeMyCenterThatOrder() {
    const order = await Api.MerchantOrder.retrieve(this.data.order.id)
    dispatch(Action.myCenterOrders.updateOrder(order))
  },
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
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
    navToShop() {
      // TODO shop
    },

    handleAction(e) {
      const action = e.currentTarget.dataset.action

      switch (action) {
        case OAT.Remark: {
          return this.navToRemark()
        }
        case OAT.Delivery: {
          return this.navToDeliverGoods()
        }
        case OAT.Close: {
          return this.navToCancelOrder()
        }
        case OAT.AmendPrice: {
          return this.navToAmendPrice()
        }
        case OAT.CheckLogistics: {
          return this.navToDeliveryDetail()
        }
        default: {
          return this.navToAmendPrice()
        }
      }
    },

    /**
     * 跳转到备注
     */
    navToRemark() {
      const { order } = this.data
      router.go("merchantRemark", { id: order.id })
    },

    /**
     * 跳转到发货
     */
    navToDeliverGoods() {
      this.storeMerchantThatOrder()
      router.go("merchantDeliver")
    },

    /**
     * 跳转到取消订单
     */
    navToCancelOrder() {
      this.storeMerchantThatOrder()
      router.go("merchantCancelOrder")
    },

    /**
     * 跳转到改价页面
     */
    navToAmendPrice() {
      this.storeMerchantThatOrder()
      router.go("merchantAmendPrice")
    },

    /**
     * 跳转到物流详情
     */
    navToDeliveryDetail() {
      this.storeMyCenterThatOrder()
      router.go("merchantDeliveryDetail")
    },

    /**
     * 跳转到订单详情页或售后单详情页
     */
    navToOrderDetail() {
      const { order } = this.data
      router.go("merchantOrderDetail", {id: order.id})
    },
  },

  lifetimes: {
    ready() {
    }
  },

  options: {
    addGlobalClass: true
  }
}))