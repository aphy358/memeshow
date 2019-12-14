import { safeArea, menuBtn } from "ui-kit/behaviors/index"
import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let componentConfig = {
  behaviors: [safeArea(), menuBtn()],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
  },

  data: {
    navHeight: 64,

    watch: {

    },
  },

  methods: {
    // 获取 navgation 的高度
    getNavHeight() {
      const { menuBtn, statusBarHeight } = this.data
      const navHeight = menuBtn.top - statusBarHeight + menuBtn.bottom
      this.setData({ navHeight })
    },

  },

  attached() {
    this.getNavHeight()
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)