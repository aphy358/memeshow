import _ from 'lodash'
import utils from '../../utils'
let app = getApp()
let store = app.store
let pageConfig = {
  data: {
    a: _.shuffle(utils)[0]
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

Page({

})
