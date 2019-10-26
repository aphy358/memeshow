import WeAppRedux from "./libs/redux/index.js"
import createStore from "./libs/redux/createStore.js"
import reducer from "./libs/redux/store/reducer.js"
import ENVIRONMENT_CONFIG from "./libs/redux/config/envConfig.js"

// import api from "./api"

const { Provider } = WeAppRedux
const store = createStore(reducer)

App(
  Provider(store)({
    onLaunch() {},

    onShow() {},

    onHide() {},

    /**
     * 404 重定向到首页
     */

    onPageNotFound() {
      wx.redirectTo({
        url: "pages/index/index"
      })
    },

    onError() {},

    globalData: {
      ENVIRONMENT_CONFIG,
      token: ""
    }
  })
)
