import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    fontSize: {
      type: Number,
      value: 32
    },

    color: {
      type: String,
      value: "#CCCCCC"
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