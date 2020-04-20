import { OrderActions } from '@/constants/merchant-order'
import { RefundDetailRefundText } from "@/constants/merchant-refund"
const Api = wx.X.Api
import _ from 'lodash'

Component({
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
      orderDetail.sellerRemark = orderDetail.remarks.find(n => n.creatorType === "seller").content
      orderDetail.buyerRemark = orderDetail.remarks.find(n => n.creatorType === "buyer").content
    },

    emitRefund(e) {
      let { item, order } = e.currentTarget.dataset
      // 将当前退款/退货商品项 item 挂载到订单详情下
      order.thatItem = item
      
      this.triggerEvent("refund", order)
    },

    onHideContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: false })
    },

    showContactSellerPopup() {
      // this.setData({ contactSellerPopupVisible: true })
    },

    async fetchShopInfo() {
      const { orderDetail: { shop } } = this.data
      const shopInfo = await Api.Shop.retrieve(shop.id)
      console.log('shopInfo', shopInfo);
      
      this.setData({ shopInfo })
    },

    makePhoneCall() {
      const { orderDetail: { address } } = this.data
      wx.makePhoneCall({
        phoneNumber: address.tel || '15888529410'
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
})