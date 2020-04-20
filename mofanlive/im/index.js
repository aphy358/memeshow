import { IM, IMConstant } from 'im'
import XDelegator from './delegator'

export default class XIM extends IM {

	constructor(platform, options) {
		super(platform, options, new XDelegator())

		// 监听用户变化
		this.store = wx.X.store
		this.unsubscribe = this.store.subscribe(this.onStoreUpdated.bind(this))
		this.userId = ''

		this.listenEvents()
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

	listenEvents() {
		const IMEvent = IMConstant.IMEvent
		this.on(IMEvent.Ready, this.onReady.bind(this))
		this.on(IMEvent.Unready, this.onUnready.bind(this))
		this.on(IMEvent.Error, this.onError.bind(this))
		this.on(IMEvent.KickedOut, this.onKickedOut.bind(this))
		this.on(IMEvent.Groups, this.onGroups.bind(this))
		this.on(IMEvent.Sessions, this.onSessions.bind(this))
		this.on(IMEvent.Messages, this.onMessages.bind(this))
	}

	/**
	 * IM初始化完成
	 */
	onReady() {
		console.log('XIM: 初始化完成')
	}

	/**
	 * IM状态异常
	 */
	onUnready() {
		console.log('XIM: 状态异常')
	}

	/**
	 * IM错误
	 * 
	 * @param {*} error
	 */
	onError({ code, message }) {
		console.error(`XIM 错误码: ${code}，错误消息: ${message}`)
	}

	/**
	 * 被踢下线
	 * 
	 * @param {*} reason 
	 */
	onKickedOut(reason) {
		console.error(`XIM 被踢下线: ${reason}`)
	}

	/**
	 * 用户群组列表更新
	 * 
	 * @param {*} groups 
	 */
	onGroups(groups) {
		console.log(`XIM 更新群组: `, groups)
	}

	/**
	 * 用户会话列表更新
	 * 
	 * @param {*} sessions 
	 */
	onSessions(sessions) {
		console.log(`XIM 更新会话: `, sessions)
	}

	/**
	 * 收到消息
	 * 
	 * @param {*} messages 
	 */
	onMessages(messages) {
		console.log(`XIM 接收消息: `, messages)
	}
}