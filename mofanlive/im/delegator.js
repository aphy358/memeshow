import { IMDelegator } from 'im'

export default class XDelegator extends IMDelegator {

	async loginCredentials() {
		const userId = wx.X.store.getState().userProfile.id
		if (!userId) {
			throw new Error('用户未登录，无法登录IM')
		}
		return await wx.X.Api.auth.imToken()
	}

	
}