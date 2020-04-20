/**
 * 生产环境配置
 */
export default {
  // API配置
  api: {
    // 应用API
    app: {
      // baseUrl: 'http://123.207.121.203:10280/mofanshow'
      baseUrl: "https://api.mofanshow.mofanbaby.com/mofanshow"
    }
  },

  // 腾讯云通信
  tim: {
    appId: "1400300224",
    logLevel: 1
  },

  // 云存储
  cos: {
    region: "ap-guangzhou",
    bucket: "mofanshow-avatar-1252461817"
  }
}
