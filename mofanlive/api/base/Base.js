/**
 * API 基本结构
 *
 * 对 `wx.request` 的封装
 * 1. promise
 * 2. module
 * 3. REST_ful
 *
 * @class Base
 */

export default class Base {
  constructor(config) {
    this.baseurl = config.baseurl
  }

  /**
   * Base request
   * Low level API
   *
   * @memberof Base
   * @param {string} method
   * @param {string} path
   * @param {object} [data={}]
   * @returns {Promise}
   */

  request(method, path, data = {}) {
    const url = this.baseurl + path
    const header = {}

    try {
      return new Promise((resolved, rejected) => {
        wx.request({
          url,
          method,
          data,
          header,
          success(res) {
            if (res.statusCode === 200)
              resolved && resolved(res.data ? res.data : res.data.data)
          },
          fail(reason) {
            this.debug(reason)
            rejected && rejected(reason)
          },
          complete(res) {
            console.info(res)
          }
        })
      })
    } catch (e) {
      this.debug(e)
    }
  }

  /**
   * Post request
   * Top level API
   *
   * @memberof Base
   * @param {string} path
   * @param {object} [data={}]
   * @returns {Promise}
   */

  async post(path, data = {}) {
    return await this.request("post", path, data)
  }

  /**
   * Get request
   * Top level API
   *
   * @memberof Base
   * @param {string} path
   * @param {object} [data={}]
   * @returns {Promise}
   */

  async get(path, data = {}) {
    if (Object.keys(data).length > 0) {
      let qs = "?"
      for(let [key, value] of Object.entries(data)) {
        qs += `${key}=${value}&`
      }
      path += qs.slice(0, -1)
    }
    return await this.request("get", path)
  }

  /**
   * Put request
   * Top level API
   *
   * @memberof Base
   * @param {*} path
   * @param {*} [data={}]
   */

  async post(path, data = {}) {}

  /**
   * Delete request
   * Top level API
   *
   * @param {*} path
   * @param {*} [data={}]
   * @memberof Base
   */

  async delete(path, data = {}) {}

  /**
   * Logger settings
   *
   * @memberof Base
   */

  async logger() {}

  /**
   * Error Handler
   *
   * @memberof Base
   * @todo
   */

  async debug(e) {
    console.error(e)
  }
}
