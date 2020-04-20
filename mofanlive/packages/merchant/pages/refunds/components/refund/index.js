import { connectComponent } from "wx-redux"
import { RST, RefundStateText, RefundListActions } from '@/constants/merchant-refund'
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    refund: {
      type: Object,
      value: {}
    },
  },

  data: {
    RST,
    RefundStateText,
    RefundListActions,
  },

  methods: {
    /**
     * 跳转到店铺
     */
    navToShop() {
      // TODO shop
    },

    /**
     * 跳转到订单详情页或售后单详情页
     */
    navToRefundDetail() {
      const { refund } = this.data
      router.go("merchantRefundDetai", {
        id: refund.id
      })
    },
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))