import { IM } from 'im'
import XDelegator from './delegator'

export default class XIM extends IM {

	constructor() {
		super(...arguments, new XDelegator())

		// 监听用户变化
		this.store = wx.X.store
		this.unsubscribe = this.store.subscribe(this.onStoreUpdated.bind(this))
		this.userId = ''
	}

	async onStoreUpdated() {
		const state = this.store.getState()
		// 用户变化，重新登录IM
		const userProfile = state.userProfile
		if (this.userId !== userProfile.id) {
			if (!!this.userId) {
				await this.logout()
			}
			if (!!userProfile.id) {
				this.userId = userProfile.id
				await this.login()
			}
		}
	}

}