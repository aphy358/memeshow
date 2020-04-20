import { connectComponent } from "wx-redux"
import Action from "@/redux/action"

const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  storeMyCenterThatOrder() {
    dispatch(Action.myCenterOrders.updateOrder(this.data.order))
  },
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  properties: {
    order: {
      type: Object,
      value: {}
    }
  },

  methods: {
    navToDeliveryDetail() {
      this.storeMyCenterThatOrder()
      router.go("deliveryDetail")
    },
  },

  options: {
    addGlobalClass: true
  }
}))