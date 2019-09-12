import { connect } from '../../../../plugins/redux/index.js'
let app = getApp()
let store = app.store
let pageConfig = {
  data: {
  },
  // 测试使用
  onLoad() {
  },
  onShow() {
  },
  onShareAppMessage() {
  },
  /**
   * 重置store数据
   */
  testClick: function () {
    store.dispatch({
      type: 'TEST_CLICK',
    })
  },
}
let mapStateToData = (state) => {
  return {
    testData: state.testData || store.getState().testData
  }
}
const mapDispatchToPage = (dispatch) => ({
})
let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

Page(connectedPageConfig)
