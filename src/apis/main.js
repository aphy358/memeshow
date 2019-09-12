var appId = wx.getAccountInfoSync().miniProgram.appId
const API_BASE_URL = appId == 'wx7bb8c8d0da81e92f'
  ? 'https://mofanshow.com'
  : 'https://mofanshow.test.com'

const request = (params) => {
  // 注入 token 和 openid
  const token = wx.getStorageSync('token')
  const openid = wx.getStorageSync('openid')
  params.data = params.data || {}
  Object.assign(params.data, {
    openid, token
  })

  // 拼接 url
  const _url = API_BASE_URL + params.url

  return wx.request({
    url: _url,
    method: params.method || 'post',
    data: params.data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: _getSuccessFunc(params, true),
    // 如果用户传递了 fail 的函数定义，则使用用户定义的函数，如果没有则给出默认的 fail 处理方式
    fail: params.fail || function (res) {
      wx.hideLoading()
      wx.showToast({
        title: res.errMsg,
        icon: 'none',
        duration: 2000
      })
    },
    complete: params.complete
  })
}

function _getSuccessFunc(params, mustLogin){
  return function (res) {
    if (res.data.returnCode == -400001) {
      // 如果未登录，则登录
    } else if (res.data.returnCode == 1) {
      params.success(res)
    } else {
      wx.hideLoading()
      // 显示错误信息
      wx.showToast({
        title: res.data.returnMsg,
        icon: 'none',
        duration: 3000
      })
    }
  }
}


module.exports = {
  request,
  queryMobileLocation: (data) => {
    return request('/common/mobile-segment/location', false, 'get', data)
  },
}

