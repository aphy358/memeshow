import promisify from 'wx-promisify'
import axios from 'axios'
import axiosAdapter from 'axios-miniprogram-adapter'

import WeAppRedux from "libs/redux/index.js"
import createStore from "libs/redux/createStore.js"
import reducer from "@/redux/reducers/index.js"

import ENVIRONMENT_CONFIG from './config/envConfig.js'
import PAGE_CONFIG from './config/pageConfig.js'

// 扩展wx的回调接口为promise，以支持await/async
promisify(wx)

// 配置axios
axios.defaults.adapter = axiosAdapter


const { Provider } = WeAppRedux
const store = createStore(reducer)

App(
  Provider(store)({
    onLaunch() {
      wx.hideTabBar()
    },

    onShow() { },

    onHide() { },

    /**
     * 404 重定向到首页
     */

    onPageNotFound() {
      wx.redirectTo({
        url: "pages/index/index"
      })
    },

    onError() { },

    globalData: {
      ENVIRONMENT_CONFIG,
      PAGE_CONFIG,
      token: ""
    }
  })
)
