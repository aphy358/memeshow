import promisify from "wx-promisify"

import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { Provider } from "wx-redux"
import reducer from "./redux/reducer"
import state from "./redux/state"
import Events from "events"

import XIM from "@/im"
import { IMPlatforms } from "im"

// 引入配置，打包时会resolve为指定环境的配置，配置文件位于 ./configs
import Config from "config"

import Pages from "./constants/router"
import Router from "wx-router"

// TODO @fioman
import Procedures from "procedures-old"

import Api from "./api"

// 扩展wx的回调接口为promise，以支持await/async
promisify(wx)

// 应用全局命名空间
wx.X = wx.X || {}

// 全局事件中心
wx.X.events = wx.X.events || new Events()

// redux store
const store = createStore(reducer, state, applyMiddleware(thunk))
wx.X.store = wx.X.store || store

wx.X.procedures = Procedures

// IM系统
wx.X.IM = wx.X.IM || new XIM(IMPlatforms.Tim, Config.tim)

// 初始化API
Api.BaseApi.init({
  async onFailed(response) {
    wx.showToastAsync({
      title: `请求服务错误(${response.data.code}): ${response.data.msg}`,
      icon: "none",
      duration: 2000
    })
  },
  async onError(error) {
    wx.showToastAsync({
      title: `网络错误: ${error.message}`,
      icon: "none",
      duration: 2000
    })
  }
})
wx.X.Api = wx.X.Api || Api

// 引入路由 API
wx.X.router = new Router(Pages)

App(
  Provider(store)({

    onLaunch: async function (e) { },

    onShow: function (e) { },

    onHide() { },

    onPageNotFound() {
      wx.redirectTo({
        url: "/pages/index/index"
      })
    },

    onError() { },

    globalData: {}

  })
)
