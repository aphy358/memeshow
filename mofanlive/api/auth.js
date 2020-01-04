import BaseApi from './base'
import Config from 'config'

class AuthApi extends BaseApi {

	async loginByCode(code) {
		const rsp = await this.get('/login/weixinApp/code', { code })
		return rsp.user
	}

	async loginByMobile({ encryptedData, iv }) {
		const rsp = await this.post('/login/weixinApp/openUser', { mobile: { encryptedData, iv } })
		return rsp.user
	}

	async loginByUserInfo({ encryptedData, iv }) {
		const rsp = await this.post('/login/weixinApp/openUser', { userInfo: { encryptedData, iv } })
		return rsp.user
	}

	async imToken() {
		const USERSIG = 'eJwtzcsKgzAQBdB-ybrITCYxUejK0gcIpW*6VEzT1EfFigil-15Rl3Pu5c6XneOT15mGhYx7wBbj7TJTte7hRkaOhJxEoIlQ*wFqMdc*WZ7UtctYiAKAADgXU2L62jVmcCklB4BJW1eOpjT4mpScV5wdvlyjLmnWUJZ7lRaUHPu3Pdjn3axE9cqVjDcXuvGo2G3RLtnvD8e*MxM_'
		return { userID: '1213123498331869184', userSig: USERSIG }
	}

}

export default new AuthApi(Config.api.app.baseUrl)