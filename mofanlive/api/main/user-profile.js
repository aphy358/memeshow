import BaseApi from 'api'

export default class UserProfileApi extends BaseApi {

  /**
   * 上传文件
   * 
   * @param {String} type 
   */
  async uploadFile(type) {
    const rsp = await this.get('/oss/token', { type })
    return rsp.credentials
  }

  /**
   * 更新用户信息
   * 
   * @param {*} params 
   * {
   *   "avatar": "string",
   *   "nickname": "string",
   *   "signature": "string",
   *   "gender": 0,
   *   "birthday": 0,
   *   "country": "string",
   *   "province": "string",
   *   "city": "string",
   *   "district": "string",
   *   "location": "string"
   * }
   */
  async updateUserInfo(params) {
    return await this.post('/profile/user/update', params)
  }

  /**
   * 更新绑定手机号
   * 
   * @param {String} encryptedData 
   * @param {String} iv 
   */
  async setMobile({ encryptedData, iv }) {
    return await this.post('/profile/user/resetMobile/weixinApp', { encryptedData, iv })
  }

  /**
   * 为验证身份获取验证短信
   */
  async getVeriCodeForVerify() {
    return await this.get('/captcha/mobileOwnership')
  }

  /**
   * 验证身份
   * 
   * @param {String} code 
   */
  async veriOwnerShip({ code }) {
    return await this.post('/captcha/mobileOwnership', { code })
  }

  /**
   * 为设置手机号获取验证短信
   * 
   * @param {String} mobile 
   */
  async getVeriCodeForSetMobile({ mobile }) {
    return await this.get('/captcha/resetMobile', { mobile })
  }

  /**
   * 重置手机号
   * 
   * @param {String} mobile 
   * @param {String} code 
   */
  async resetMobile({ mobile, code }) {
    return await this.post('/profile/user/resetMobile', { mobile, code })
  }

  /**
	 * 添加地址
	 * 
	 * @param {string} name
	 * @param {string} tel
	 * @param {string} province
	 * @param {string} city
	 * @param {string} district
	 * @param {string} address
	 */
  async createAddress(address) {
    return await this.post('/profile/address', address)
  }

  /**
   * 删除地址
   * @param {string} id 
   */
  async deleteAddress(id) {
    return await this.delete(`/profile/address?id=${id}`)
  }

  /**
   * 获取地址列表
   */
  async listAddress() {
    return await this.get('/profile/address')
  }

  /**
   * 设置地址为默认地址
   * 
   * @param {string} id
   * @param {string} name
	 * @param {string} tel
	 * @param {string} province
	 * @param {string} city
	 * @param {string} district
	 * @param {string} address
   * @param {boolean} isDefault
   */
  async updateAddress(address) {
    return await this.put('/profile/address', address)
  }

  /**
   * 更新雇员信息
   * @param {string} avatar
   * @param {string} sn
   * @param {string} name
   * @param {string} position
   * @param {string} wechat
   * @param {string} wechatQrCode
   * @param {string} wxworkKfId
   */
  async updateEmployee(employee) {
    return await this.post('/profile/employee', employee)
  }
}
