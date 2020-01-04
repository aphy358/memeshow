import promisify from 'wx-promisify'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'wx-redux'
import reducer from './redux/reducer'
import state from './redux/state'
import Action from './redux/action'

import IM from './im'
import { IMPlatforms } from 'im'

import procedures from 'procedures'

import Api from './api'

import timer from './components/common/timer'

import Config from 'config'

// 扩展wx的回调接口为promise，以支持await/async
promisify(wx)

// 应用全局命名空间
wx.X = wx.X || {}

// redux store
const store = createStore(reducer, state, applyMiddleware(thunk))
wx.X.store = wx.X.store || store

// IM系统
wx.X.IM = wx.X.IM || new IM(IMPlatforms.Tim, Config.tim)

wx.X.procedures = wx.X.procedures || procedures
wx.X.timer = timer

// 初始化API 
Api.BaseApi.init({
  async onFailed(response) {
    wx.showToastAsync({
      title: `请求服务错误(${response.data.code}): ${response.data.msg}`,
      icon: 'none',
      duration: 2000
    })
  },
  async onError(error) {
    wx.showToastAsync({
      title: `网络错误: ${error.message}`,
      icon: 'none',
      duration: 2000
    })
  }
})
wx.X.Api = wx.X.Api || Api

App(
  Provider(store)({

    onLaunch: async function (e) {
      const res = await wx.loginAsync()
      if (res && res.code) {
        const userProfile = await Api.auth.loginByCode(res.code)
        if (!!userProfile) {
          // 已注册用户直接登录成功
          store.dispatch(Action.userProfile.update(userProfile))
        }
      }
    },

    onShow: function (e) { },

    onHide() { },

    onPageNotFound() {
      wx.redirectTo({
        url: "pages/index/index"
      })
    },

    onError() { },

    globalData: {}

  })
)
