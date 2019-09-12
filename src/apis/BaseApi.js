module.exports = class BaseApi {

  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

	/**
	 * low level for call api
	 * 
	 * @param {String} path
	 *  the path of api
	 * 
	 * @param {String} method 
	 *  the method of request
	 * 
	 * @param {Object} data
	 *  data if the method of request is POST
	 * 
	 * @returns {Promise}
	 */
  async request(path, method = 'get', data = {}) {
    try {
      const url = this.baseUrl + path
      const res = await wx.requestAsync({
        url,
        data,
        dataType: 'json',
        method,
        header: {
          'content-type': 'application/json',
          'cookie': getApp().globalData.token
        }
      })

      console.debug(res)
      if (res.data.code !== 0) {
        throw res.data.msg
      }

      return (res.data.data ? res.data.data : res.data.msg)
    } catch (e) {
      console.error(e)
    }
  }

}