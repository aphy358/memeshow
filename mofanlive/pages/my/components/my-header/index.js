import { connectComponent } from "wx-redux"
import { menuBtn } from "ui-kit/behaviors/index"

const mapStateToProps = state => ({
  userProfile: state.userProfile
})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  behaviors: [menuBtn()],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {

  },

  methods: {

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