let cache = null

function getSafeArea() {
  return new Promise((resolve, reject) => {
    if (cache) {
      resolve(cache)
    } else {
      wx.getSystemInfo({
        success(res) {
          const model = res.model,
            safeArea = res.safeArea,
            screenHeight = res.screenHeight,
            statusBarHeight = res.statusBarHeight
          const iphoneX = /iphone x/i.test(model)
          const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812
          cache = {
            safeArea,
            statusBarHeight,
            isIPhoneX: iphoneX || iphoneNew
          }
          resolve(cache)
        },
        fail: reject
      })
    }
  })
}

export function safeArea(options = {}) {
  let _options = options
  let safeAreaInsetBottom =
    _options.safeAreaInsetBottom === void 0
      ? true
      : _options.safeAreaInsetBottom
  let safeAreaInsetTop =
    _options.safeAreaInsetTop === void 0 ? false : _options.safeAreaInsetTop

  return Behavior({
    properties: {
      safeAreaInsetTop: {
        type: Boolean,
        value: safeAreaInsetTop
      },
      safeAreaInsetBottom: {
        type: Boolean,
        value: safeAreaInsetBottom
      }
    },

    data: {
      safeArea: {},
      isIPhoneX: false,
      statusBarHeight: 0
    },

    attached() {
      getSafeArea().then(res => {
        const safeArea = res.safeArea
        const isIPhoneX = res.isIPhoneX
        const statusBarHeight = res.statusBarHeight
        this.setData({
          safeArea,
          isIPhoneX,
          statusBarHeight
        })
      })
    }
  })
}
