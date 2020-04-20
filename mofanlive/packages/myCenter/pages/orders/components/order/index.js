import { connectComponent } from "wx-redux"
import { OAT, OrderStateText, OrderListActions } from '@/constants/order'
import { RefundStateText, RefundListActions } from '@/constants/refund'
import Action from "@/redux/action"
import _ from 'lodash'
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  async storeMyCenterThatOrder() {
    const order = await Api.Order.retrieve(this.data.order.id)
    dispatch(Action.myCenterOrders.updateOrder(order))
  },
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({

  properties: {
    order: {
      type: Object,
      value: {},
      observer: 'orderChange'
    },
  },

  data: {
    OAT,
    RefundListActions,
    RefundStateText,
    OrderStateText,
    OrderListActions,
  },

  methods: {
    orderChange(newVal) {
      let { order } = this.data
      let totalNum = _.reduce(newVal.items, (res, item) => {
        return res + item.num
      }, 0)
      order.totalNum = totalNum

      this.setData({ order })
    },

    navToShop() {
      // TODO shop

    },

    handleAction(e) {
      const action = e.currentTarget.dataset.action

      switch (action) {
        case OAT.Pay: {
          return this.payOrder()
        }
        case OAT.Close: {
          return this.cancleOrder()
        }
        case OAT.Receive: {
          return this.receiveOrder()
        }
        case OAT.RemindDelivery: {
          return this.remindDelivery()
        }
        case OAT.BuyAgain: {
          return this.bookAgain()
        }
        case OAT.CheckLogistics: {
          return this.navToDeliveryDetail()
        }
        case OAT.DelayReceive: {
          return this.delayReceive()
        }
        case OAT.MakeComment: {
          return ''
        }
      }
    },

    navToDeliveryDetail() {
      this.storeMyCenterThatOrder()
      router.go("deliveryDetail")
    },

    /**
     * 延迟收货
     */
    delayReceive() {
      wx.showToast({
        title: '已延长收货',
        icon: 'none',
      });
    },

    /**
     * 提醒发货
     */
    remindDelivery() {
      wx.showToast({
        title: '已提醒卖家发货\r\n请耐心等候',
        icon: 'none',
      });
    },

    /**
     * 支付订单
     */
    async payOrder() {
      const { order } = this.data

      wx.showLoading()
      const { credential } = await Api.Order.pay({orderId: order.id})
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

    /**
     * 确认收货
     */
    async receiveOrder() {
      const { order } = this.data

      wx.showModal({
        title: '确认收货',
        content: '确认收货后，订单交易完成，钱款将立即到达商家账户',
        cancelText: '取消',
        confirmText: '确认收货',
        confirmColor: '#FE2C54',
        cancelColor: '#333333',
        success: async (res) => {
          if (res.confirm) {
            await Api.Order.receive({ orderId: order.id })
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
     * 再来一单
     */
    async bookAgain() {
      const { items } = this.data.order
      console.log('order', this.data.order);

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
     * 取消订单
     */
    async cancleOrder() {
      let { order } = this.data
      const _this = this

      try {
        wx.showModal({
          content: '确定取消订单？',
          success: async function (res) {
            if (res.confirm) {
              wx.showLoading({
                title: '取消中...',
              })
              await Api.Order.cancel({ orderId: order.id })
              wx.hideLoading()
              wx.showToast({
                title: '已取消订单！',
                duration: 2000,
                icon: 'none',
              })

              // 取消成功后，更新页面中的订单状态（传递给父组件让父组件去更新）
              order.actions = null
              order.state = 'close'
              _this.triggerEvent('orderStatusChange', { order })
            }
          },
          fail: function (res) { }
        })
      } catch (error) {
        wx.showToast({
          title: '取消订单失败！',
          duration: 2000,
          icon: 'none',
        })
      }
    },

    /**
     * 跳转到订单详情页或售后单详情页
     */
    navToOrderDetail() {
      const { order } = this.data
      router.go("orderDetail", {id : order.id})
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