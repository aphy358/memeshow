import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})
Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {

  },

  methods: {
    onContact(e) {
    },

    navigateToAddress() {
      const instance = wx.X.procedures.open("address-selector")
      instance.asCaller().emit('selecting', { selecting: false })
    },
  },

  lifetimes: {
    ready() {
    },
    attached() {
    },
    detached() {
    }
  },
}))
