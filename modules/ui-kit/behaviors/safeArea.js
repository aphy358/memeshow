// 缓存
let cache = null

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
      safeArea: {
        bottom: 667,
        height: 647,
        left: 0,
        right: 375,
        top: 20,
        width: 375
      },
      isIPhoneX: false,
      isIPhone: false,
      statusBarHeight: 20
    },

    attached() {
      getSafeArea().then(res => {
        const {
          safeArea,
          isIPhoneX,
          isIPhone,
          statusBarHeight
        } = res
        
        this.setData({
          safeArea,
          isIPhoneX,
          isIPhone,
          statusBarHeight
        })
      })
    }
  })
}

/**
 * 获取设备的信息
 */

function getSafeArea() {
  return new Promise((resolve, reject) => {
    if (cache) {
      resolve(cache)
    } else {
      wx.getSystemInfo({
        success(res) {
          const {
            model,
            safeArea,
            screenHeight,
            statusBarHeight
          } = res
          const isIPhone = /iphone/i.test(model)
          const iphoneX = /iphone x/i.test(model)
          const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812
          cache = {
            safeArea,
            statusBarHeight,
            isIPhoneX: iphoneX || iphoneNew,
            isIPhone
          }
          resolve(cache)
        },
        fail: reject
      })
    }
  })
}
