import promisify from 'wx-promisify'
import axios from 'axios'
import axiosAdapter from 'axios-miniprogram-adapter'

import { Provider } from "libs/redux/index.js"
import createStore from "libs/redux/createStore.js"
import reducer from "@/redux/reducers/index.js"

import procedures from 'procedures'

import ENVIRONMENT_CONFIG from './config/envConfig.js'
import PAGE_CONFIG from './config/pageConfig.js'

// 扩展wx的回调接口为promise，以支持await/async
promisify(wx)

// 配置 axios adapter & baseURL
axios.defaults.adapter = axiosAdapter
// axios.defaults.baseURL = 'http://192.168.0.92:10240'
wx.axios = axios

// 应用全局命名空间
wx.X = wx.X || {}
wx.X.procedures = procedures

const store = createStore(reducer)

App(
  Provider(store)({
    onLaunch: function (e) {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
      let systemInfo = wx.getSystemInfoSync()
      this.globalData.videoContainerSize = {
        width: systemInfo.windowWidth,
        height: systemInfo.windowHeight
      }
      this.globalData.isPushBeCallPage = false
    },

    onShow: function (e) {
      if (e.scene == 1007 || e.scene == 1008) {
        try {
          this.globalData.netcall && this.globalData.netcall.destroy()
          this.globalData.nim && this.globalData.nim.destroy({
            done: function () {
            }
          })
        } catch (e) {
        }
      }
    },

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
      emitter: null,
      netcallController: null,
      ENVIRONMENT_CONFIG,
      PAGE_CONFIG
    },
  })
)
