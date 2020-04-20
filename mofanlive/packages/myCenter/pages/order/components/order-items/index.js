import { connectComponent } from "wx-redux"
import { OrderActions } from '@/constants/order'
import { RefundDetailRefundText } from "@/constants/refund"
import _ from 'lodash'
import Action from "@/redux/action"
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  // 将订单详情存进 store
  stateOrder(order) {
    dispatch(Action.createRefund.updateRefund(order))
  }
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  properties: {
    items: {
      type: Object,
      value: []
    },
    orderDetail: {
      type: Object,
      value: {},
      observer(newVal) {
        if (newVal && newVal.shop) {
          this.setRemark()
          this.fetchShopInfo()
        }
      }
    },
  },

  data: {
    OrderActions,

    RefundDetailRefundText,

    totalQuantity: 0,

    contactSellerPopupVisible: false,

    shopInfo: null,
  },

  methods: {
    /**
     * 设置备注
     */
    setRemark() {
      let { orderDetail } = this.data

      const sellerRemark = orderDetail.remarks.find(n => n.creatorType === "seller")
      const buyerRemark = orderDetail.remarks.find(n => n.creatorType === "buyer")

      if (sellerRemark) orderDetail.sellerRemark = sellerRemark.content
      if (buyerRemark) orderDetail.buyerRemark = buyerRemark.content
    },

    /**
     * 处理点击退款按钮
     * @param {event} e
     */
    handleRefund(e) {
      let { item, order } = e.currentTarget.dataset
      // 将当前退款/退货商品项 item 挂载到订单详情下
      order.thatItem = item

      if (!!item.actions) {
        this.createRefund(order)
      } else {
        this.navToRefund(order)
      }
    },

    /**
     * 创建一个退款单
     * @param {Object} sku
     */
    createRefund(order) {
      // 先将订单详情存入 store
      this.stateOrder(order)
      router.go("createRefund")
    },

    /**
     *  跳转到已经申请退款的sku的退款详情
     * @param {Object} sku
     */
    navToRefund({ thatItem }) {
      router.go("refundDetail", { id: thatItem.refund })
    },

    onHideContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: false })
    },

    showContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: true })
    },

    async fetchShopInfo() {
      const { orderDetail: { shop } } = this.data
      const shopInfo = await Api.Shop.retrieve(shop.id)
      console.log('shopInfo', shopInfo);

      this.setData({ shopInfo })
    },

    makePhoneCall() {
      const { orderDetail: { shop } } = this.data
      wx.makePhoneCall({
        phoneNumber: shop.mobile || '15888529410'
      })
    }
  },

  observers: {
    items(items) {
      this.setData({
        totalQuantity: _.reduce(items, (res, item) => {
          return res + item.num
        }, 0)
      })
    }
  },

  options: {
    addGlobalClass: true
  }
}))
