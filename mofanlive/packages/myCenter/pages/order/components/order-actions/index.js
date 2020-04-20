import {safeArea} from 'ui-kit/behaviors/safeArea'
import _ from 'lodash'
import { OAK, OAT, OrderDetailActions } from '@/constants/order'
const Api = wx.X.Api

Component({
  properties: {
    orderDetail: {
      type: Object,
      value: []
    }
  },

  data: {
    OAK,

    OrderDetailActions,
  },

  observers: {
    orderDetail(arr) {
    }
  },

  methods: {
    handleAction(e) {
      const action = e.currentTarget.dataset.action

      switch (action) {
        case OAT.GoToPay: {
          return this.payOrder()
        }
        case OAT.BuyAgain: {
          return this.bookAgain()
        }
        case OAT.Receive: {
          return this.receiveOrder()
        }
      }
    },

    /**
     * 再来一单
     */
    async bookAgain() {
      const { items } = this.data.orderDetail

      for (let i = 0; i < items.length; i++) {
        const { skuId, num, productId } = items[i];
        await Api.Cart.addItem({
          skuId: skuId,
          productId: productId,
          quantity: num,
        })
      }

      wx.X.procedures.open("cashier")
    },

    /**
     * 确认收货
     */
    async receiveOrder() {
      const { orderDetail } = this.data

      wx.showModal({
        title: '确认收货',
        content: '确认收货后，订单交易完成，钱款将立即到达商家账户',
        cancelText: '取消',
        confirmText: '确认收货',
        confirmColor: '#FE2C54',
        cancelColor: '#333333',
        success: async (res) => {
          if (res.confirm) {
            await Api.Order.receive({ orderId: orderDetail.id })
            wx.showToast({
              title: '操作成功！', //提示的内容,
              icon: 'success',
            });
            this.triggerEvent('refreshOrder')
          }
        }
      })
    },

    /**
     * 支付订单
     */
    async payOrder() {
      const { orderDetail } = this.data

      wx.showLoading()
      const { credential } = await Api.Order.pay({orderId: orderDetail.id})
      wx.hideLoading()

      wx.requestPayment({
        timeStamp: credential.timeStamp,
        nonceStr: credential.nonceStr,
        package: credential.package,
        signType: credential.signType,
        paySign: credential.paySign,
        success(res) {
          wx.showToast({
            title: "支付成功！",
            icon: "none"
          })
        },
        fail(res) {
          wx.showToast({
            title: "支付失败！",
            icon: "none"
          })
        },
      })
    },

  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true
  }
})