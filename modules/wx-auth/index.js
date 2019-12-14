
const interceptToken = token => {
  return config => {
    config.headers['X-Authorization'] = token
    return config
  }
}

const loginWithMobile = e => doLogin('mobile', e)

const loginWithUserInfo = e => doLogin('userInfo', e)

const login = e => doLogin('', e)

const doLogin = (type, e) => {
  if (e && e.detail && e.detail.errMsg && e.detail.errMsg.indexOf('ok') === -1) {
    return Promise.reject(e.detail.errMsg)
  }

  const iv = e && e.detail && e.detail.iv
  const encryptedData = e && e.detail && e.detail.encryptedData

  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          const code = res.code

          if (type === 'userInfo') {
            return resolve({ code, userInfo: { iv, encryptedData } })
          }

          if (type === 'mobile') {
            return resolve({ code, mobile: { iv, encryptedData } })
          }

          return resolve({ code })

        } else {
          return reject(res.errMsg)
        }
      },
      fail() {
        return reject(...arguments)
      }
    })
  })
}

export { interceptToken, login, loginWithMobile, loginWithUserInfo }
