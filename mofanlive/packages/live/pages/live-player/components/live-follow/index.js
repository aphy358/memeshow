import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    remindCheck: true,
  },

  methods: {
    hidePopup() {
      this.triggerEvent('hideFollow')
    },

    switchRemind({ detail }) {
      this.setData({ remindCheck: detail.checked })
      console.log('switchRemind', this.data.remindCheck);
      
    },
  }
}))