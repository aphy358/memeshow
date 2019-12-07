import { connect } from "libs/redux/index.js"
import { menuBtn } from "ui-kit/behaviors/menuBtn"
const app = getApp()
const store = app.store


let componentConfig = {
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

  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)