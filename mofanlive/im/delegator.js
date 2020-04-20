import { IMDelegator } from 'im'
import { XIMMessages } from './message'

export default class XDelegator extends IMDelegator {

	async loginCredentials() {
		const userID = wx.X.store.getState().userProfile.id
		if (!userID) {
			throw new Error('用户未登录，无法登录IM')
		}

		const userSig = await wx.X.Api.Auth.getSignature()
		return { userID, userSig }
	}

	/**
	 * 创建用户自定义消息
	 * 
	 * @param {*} type 
	 * @param {*} payload 
	 */
	createCustomMessage(type, payload = {}) {
		const clz = XIMMessages[type]
		
		if (!clz) {
			throw new Error(`未知的自定义消息: ${type}`)
		}
		const msg = new clz(payload)
		return msg
	}

}