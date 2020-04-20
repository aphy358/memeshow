import { connectComponent } from "wx-redux"
import { safeArea } from "ui-kit/behaviors/safeArea"
import { RefundDetailActions, RAT } from "@/constants/refund"
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

Component(
  connectComponent(
    mapStateToProps,
    mapDispatchToProps
  )({
    properties: {
      refundDetail: {
        type: Object,
        value: {}
      }
    },

    data: {
      RAT,
      RefundDetailActions
    },

    methods: {
      /**
       * 点击底部操作按钮
       */
      actionClick(e) {
        const key = e.currentTarget.dataset.key

        switch (key) {
          case RAT.CancelRefund: {
            this.cancelRefund()
            break
          }
          case RAT.ApplyCustomService: {
            this.applyCustomService()
            break
          }
          case RAT.AmendRefund: {
            this.amendRefund()
            break
          }
          case RAT.RefundAgain: {
            this.refundAgain()
            break
          }
          case RAT.FillInLogistics: {
            this.fillInLogistics()
            break
          }
          default: {
            break
          }
        }
      },

      /**
       * 撤销申请
       */
      cancelRefund() {
        const { refundDetail } = this.data
        wx.showModal({
          // title: '',
          content:
            "撤销退款申请后，本次退款申请将关闭，如后续仍有问题，您可再次发起退款申请。",
          cancelText: "暂不撤销",
          confirmColor: "#FE2C54",
          cancelColor: "#333333",
          success: async res => {
            if (res.confirm) {
              await Api.Refund.cancel({ refundId: refundDetail.id })
              wx.showToast({
                title: "已撤销申请！", //提示的内容,
                icon: "none" //图标,
              })
              this.triggerEvent("refreshRefund")
            }
          }
        })
      },

      /**
       * 申请客服介入
       */
      async applyCustomService() {
        router.go("csIntervene", { id: this.data.refundDetail.id })
      },

      /**
       * 修改申请
       */
      async amendRefund() {
        const { refundDetail } = this.data

        const orderDetail = await Api.Order.retrieve(refundDetail.orderId)
        orderDetail.thatItem = refundDetail.items[0]
        orderDetail.thatRefundDetail = refundDetail
        this.createRefund(orderDetail)
      },

      /**
       * 再次申请
       */
      async refundAgain() {
        const { refundDetail } = this.data

        const orderDetail = await Api.Order.retrieve(refundDetail.orderId)
        orderDetail.thatItem = refundDetail.items[0]
        this.createRefund(orderDetail)
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
       * 填写退货物流
       */
      fillInLogistics() {
        router.go("checkinDelivery", {id: this.data.refundDetail.id})
      }
    },

    lifetimes: {
      attached: function() {},

      detached: function() {}
    },

    behaviors: [safeArea()],

    options: {
      addGlobalClass: true
    }
  })
)
