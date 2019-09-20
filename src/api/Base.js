/**
 * APi 基本结构
 *
 * @class BaseAPI
 */

export default class BaseAPI {
  constructor(config) {
    this.baseurl = config.baseurl
  }

  async request(path, method = "get", data = {}) {
    try {
      const url = this.baseurl + path
      const res = await wx.requestAsync({
        url,
        method,
        data
      })

      return res.data ? res.data : res.data.data
    } catch(e) {
      console.error(e)
    }
  }

  async logger() {

  }

  async debug() {

  }
}
