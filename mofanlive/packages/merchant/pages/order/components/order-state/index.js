import { connectComponent } from "wx-redux"
import { OAK } from '@/constants/merchant-order'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 表示该组件样式将影响到自定义组件
    styleIsolation: 'shared'
  },

  properties: {
    order: {
      type: Object,
      value: {},
    }
  },

  data: {
    OAK,
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