import BaseApi from 'api'

export default class AuthApi extends BaseApi {

	async loginByCode(code) {
		const { miniProgram } = wx.getAccountInfoSync()
		const appId = miniProgram.appId
		return await this.get('/login/weixinApp/code', { code, appId })
	}

	async loginByMobile({ encryptedData, iv }) {
		return await this.post('/login/weixinApp/openUser', { mobile: { encryptedData, iv } })
	}

	async loginByUserInfo({ encryptedData, iv }) {
		return await this.post('/login/weixinApp/openUser', { userInfo: { encryptedData, iv } })
	}

	async logout() {
		return await this.post('/logout')
	}
	
	/**
	 * 计算签名
	 * 
   * @param {String} type - 签名类型。tim：腾讯云IM
	 */
	async getSignature(type = 'tim') {
		return await this.get('/sign/getSignature', { type })
	}
}
