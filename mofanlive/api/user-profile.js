import BaseApi from './base'
import Config from 'config'

class UserProfileApi extends BaseApi {

	async uploadFile(type) {
    const rsp = await this.get('/oss/token', { type })
		return rsp.credentials
  }
  
  async updateUserInfo(params) {
    return await this.post('/profile/user/update', params)
  }

  async setMobile(params) {
    return await this.post('/profile/user/resetMobile/weixinApp', params)
  }

  // 为验证身份获取验证短信
  async getVeriCodeForVerify(params) {
    return await this.get('/captcha/mobileOwnership')
  }

  // 验证身份
  async veriOwnerShip(params) {
    return await this.post('/captcha/mobileOwnership', params)
  }

  // 为设置手机号获取验证短信
  async getVeriCodeForSetMobile(params) {
    return await this.get('/captcha/resetMobile', params)
  }

  // 重置手机号
  async resetMobile(params) {
    return await this.post('/profile/user/resetMobile', params)
  }

}

export default new UserProfileApi(Config.api.app.baseUrl)