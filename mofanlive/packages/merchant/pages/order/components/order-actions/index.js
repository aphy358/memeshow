import { connectComponent } from "wx-redux"
import {safeArea} from 'ui-kit/behaviors/safeArea'
import Action from "@/redux/action"
import _ from 'lodash'
import { OAT, OrderDetailActions } from '@/constants/merchant-order'
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  async storeMerchantThatOrder() {
    const orderDetail = await Api.MerchantOrder.retrieve(this.data.orderDetail.id)
    dispatch(Action.merchantOrders.updateOrder(orderDetail))
  },
  storeMyCenterThatOrder() {
    dispatch(Action.myCenterOrders.updateOrder(this.data.orderDetail))
  },
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  properties: {
    orderDetail: {
      type: Object,
      value: []
    }
  },

  data: {
    OrderDetailActions,
  },

  methods: {
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
      const { orderDetail } = this.data
      router.go("merchantRemark", { id: orderDetail.id })
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
      const { orderDetail } = this.data
      router.go("merchantOrderDetail", { id: orderDetail.id})
    },

  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true
  }
}))