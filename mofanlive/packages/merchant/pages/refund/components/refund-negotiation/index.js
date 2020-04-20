import { connectComponent } from "wx-redux"
import Action from "@/redux/action"
const router = wx.X.router

const mapStateToProps = state => ({
  userProfile: state.userProfile
})

const mapDispatchToProps = dispatch => ({
  // 将售后单详情存进 store
  stateRefund(refund) {
    dispatch(Action.audits.updateRefund(refund))
  }
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    refundDetail: {
      type: Object,
      value: {},
    }
  },

  data: {
  },

  methods: {
    /**
     * 跳转到 ‘查看协商记录’ 页面
     */
    navToAudits() {
      const { refundDetail } = this.data
      this.stateRefund(refundDetail)
      router.go("merchantAudits", {
        id: refundDetail.id
      })
    }
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))
