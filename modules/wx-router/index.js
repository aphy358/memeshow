/**
 * wx 小程序 Router
 */
export default class Router {
  constructor(pages) {
    if (
      !pages ||
      typeof pages !== "object" ||
      !Object.keys(pages).length
    ) {
      throw Error("Router 需要页面配置信息")
    }

    this.pages = Object.freeze(pages)

    // 路由的回调
    this.callbacks = {}
    this.success = function(onSuccess) {
      this.callbacks.onSuccess = onSuccess
      return this
    }
    this.fail = function(onFail) {
      this.callbacks.onFail = onFail
      return this
    }
    this.complete = function(onComplete) {
      this.callbacks.onComplete = onComplete
      return this
    }
  }

  /**
   * 获取 page url
   *
   * @param {string} name
   * @returns {string}
   */
  getUrl(name) {
    const page = this._getPage()
    if (page && page.url) return page.url
    else return ""
  }

  /**
   * 底层跳转 API
   *
   * @param {string} name
   * @param {object} params
   * @param {object} options
   * @param {string} options.method - 路由的方法
   */
  go(name, params = {}, options = {}) {
    const page = this._getPage(name)
    if (!page) throw Error("请传人正确的页面名称")

    if (page.anonymous) {
      //todo 登录检测
    }

    const url = page.url +  this._qs(params)

    if ( page.tabbar && !options.method) {
      // todo tabbar 的行为精简到 $route 中
      wx.switchTab({
        url,
        ...this._getCallbacks()
      })
    } else {
      const $route = wx[options.method] || wx.navigateTo
      $route({
        url,
        ...this._getCallbacks()
      })
    }

    return this
  }

  /**
   * navigateTo
   *
   * @param {string} name
   * @param {object} params
   */
  navigate(name, params) {
    this.go(name, params, { method: "navigateTo" })
  }

  /**
   * redirectTo
   *
   * @param {string} name
   * @param {object} params
   */
  redirect(name, params) {
    this.go(name, params, { method: "redirectTo" })
  }

  /**
   * switchTab
   *
   * @param {string} name
   * @param {object} params
   */
  switchTab(name, params) {
    this.go(name, params, { method: "switchTab" })
  }

  /**
   * reLaunch
   *
   * @param {string} name
   * @param {object} params
   */
  reLaunch(name, params) {
    this.go(name, params, { method: "reLaunch" })
  }

  /**
   * navigateBack
   *
   * @param {number} delta
   */
  back(delta = 1) {
    // todo 确认微信是否会判断页面栈
    wx.navigateBack({
      delta,
      ...this._getCallbacks()
    })

    return this
  }

  /**
   * 返回 page 对象
   *
   * @param {string} name
   * @returns {object} page 对象
   */
  _getPage(name) {
    return this.pages[name]
  }

  /**
   * 获取路由回调函数
   *
   * @returns {object}
   */
  _getCallbacks() {
    const that = this
    return {
      success(res) {
        that.callbacks.onSuccess && that.callbacks.onSuccess(res)
      },

      fail(err) {
        that.callbacks.onFail && that.callbacks.onFail(err)
      },

      complete() {
        that.callbacks.onComplete && that.callbacks.onComplete()
      }
    }
  }

  /**
   * 返回 query string
   *
   * @param {object} params
   */
  _qs(params) {
    if (!params || typeof params !== "object") return ""
    return Object.entries(params).reduce(
      (query, pair) => `${query}${pair[0]}=${pair[1]}&`,
      "?"
    ).trim()
  }
}
