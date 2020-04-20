import { safeArea } from 'ui-kit/behaviors/safeArea'
import { RefundDetailActions, RAT } from '@/constants/merchant-refund'
const Api = wx.X.Api
const router = wx.X.router


Component({
  properties: {
    refundDetail: {
      type: Object,
      value: {}
    }
  },

  data: {
    RAT,
    RefundDetailActions,
  },

  methods: {
    /**
     * 点击底部操作按钮
     */
    actionClick(e) {
      const key = e.currentTarget.dataset.key

      switch (key) {
				case RAT.RejectApply: {
          this.rejectApply()
					break
        }
        case RAT.ApproveApply: {
          this.approveApply()
					break
        }
        case RAT.NegotiationAgree: {
          this.negotiationAgree()
					break
        }
        case RAT.ConfirmReturned: {
          this.confirmReturned()
					break
        }
        case RAT.RejectReturn: {
          this.rejectReturn()
					break
        }
				default: {
					break
				}
      }
    },

    /**
     * 拒绝申请
     */
    rejectApply() {
      const { refundDetail } = this.data
      router.go("merchantRejectApply", {
        id: refundDetail.id,
        type: 1
      })
    },

    /**
     * 同意买家申请
     */
    async approveApply() {
      const { refundDetail } = this.data
      let title = '同意买家退货'
      let content = '收到买家退货后将退款'

      if (refundDetail.type == 2) {
        title = '同意给买家退款'
        content = `¥${(refundDetail.amount / 100).toFixed(2)}`
      }

      wx.showModal({
        title,
        content,
        success: async (res) => {
          if (res.confirm) {
            await Api.MerchantRefund.confirm(refundDetail.id)

            wx.showToast({
              title: '已同意买家申请！',
              icon: 'none',
            });

            this.triggerEvent('refreshRefund')
          }
        }
      })
    },

    /**
     * 已与买家协商，同意退款
     */
    negotiationAgree() {
      const { refundDetail } = this.data
      let title = '同意买家退货'
      let content = '收到买家退货后将退款'
      let cbTitle = '已同意退款退货！'

      if (refundDetail.type == 2) {
        title = '同意给买家退款'
        content = `¥${(refundDetail.amount / 100).toFixed(2)}`
        cbTitle = '已同意退款！'
      }

      wx.showModal({
        title,
        content,
        success: async (res) => {
          if (res.confirm) {
            await Api.MerchantRefund.agree(refundDetail.id)

            wx.showToast({
              title: cbTitle,
              icon: 'none',
            });

            this.triggerEvent('refreshRefund')
          }
        }
      })
    },

    /**
     * 确认收货并退款
     */
    async confirmReturned() {
      const { refundDetail } = this.data

      wx.showModal({
        title: "同意给买家退款",
        content: `¥${(refundDetail.amount / 100).toFixed(2)}`,
        success: async (res) => {
          if (res.confirm) {
            await Api.MerchantRefund.confirmReturn(refundDetail.id)

            wx.showToast({
              title: '已同意退款！',
              icon: 'none',
            });

            this.triggerEvent('refreshRefund')
          }
        }
      })
    },

    /**
     * 拒绝收货
     */
    rejectReturn() {
      const { refundDetail } = this.data
      router.go("merchantRejectApply", {
        id: refundDetail.id,
        type: 2
      })
    },
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true
  }
})