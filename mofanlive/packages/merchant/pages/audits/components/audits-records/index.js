import "@/assets/images/default-icon.png"
import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({ 
  userProfile: state.userProfile,
  refundDetail: state.audits.refundDetail,
})
const mapDispatchToProps = dispatch => ({})


Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    audits: {
      type: Array,
      value: []
    }
  },

  data: {
  },

  methods: {
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))