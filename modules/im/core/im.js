import createAdaptor from '../adaptors'

/**
 * IM系统
 */
export default class IM {

	/**
	 * 创建IM系统
	 * 
	 * @param {*} platform 		平台
	 * @param {*} options			平台选项 
	 * @param {*} delegator 	回调
	 */
	constructor(platform, options, delegator) {
		this.platform = platform
		this.options = options
		this.adaptor = createAdaptor(platform, options, delegator)
		this.delegator = delegator
	}

	/**
	 * 登录
	 */
	async login() {
		return await this.adaptor.login()
	}

	/**
	 * 退出登录
	 */
	async logout() {
		return await this.adaptor.logout()
	}

	/**
	 * 获取会话列表
	 */
	async fetchSessions() {
		return await this.adaptor.fetchSessions()
	}

	/**
	 * 获取会话详情
	 * 
	 * @param {*} sessionId 
	 */
	async fetchSessionInfo(sessionId) {
	}

	/**
	 * 删除会话
	 * 
	 * @param {*} sessionId 
	 */
	async deleteSession(sessionId) {
	}

	/**
	 * 获取会话中的消息
	 * 
	 * @param {*} sessionId 
	 * @param {*} cursor 
	 * @param {*} limit 
	 */
	async fetchSessionMessages(sessionId, cursor, limit) {
	}

	/**
	 * 标记会话中的消息全部已读
	 * 
	 * @param {*} sessionId 
	 */
	async setSessionRead(sessionId) {
	}

	/**
	 * 发送消息给用户
	 * 
	 * @param {*} userId		用户
	 * @param {*} message 	消息
	 */
	async sendMessageToUser(userId, message) {
	}

	/**
	 * 发送群消息
	 * 
	 * @param {*} groupId		群组
	 * @param {*} message 	消息
	 */
	async sendMessageToGroup(groupId, message) {
	}

	/**
	 * 加入公开群组（QQ群）
	 * 
	 * @param {*} groupId 				群组
	 * @param {*} type 						群组类型
	 * @param {*} applyMessage 		附言
	 */
	async joinPublicGroup(groupId, applyMessage) {
		return await this.adaptor.joinPublicGroup(groupId, applyMessage)
	}

	/**
	 * 加入聊天室群组
	 * 
	 * @param {*} groupId 
	 */
	async joinChatRoom(groupId) {
		return await this.adaptor.joinChatRoom(groupId)
	}

	/**
	 * 加入直播间群组
	 * 
	 * @param {*} groupId 
	 */
	async joinLiveRoom(groupId) {
		return await this.adaptor.joinLiveRoom(groupId)
	}

	/**
	 * 退出群组
	 * 
	 * @param {*} groupId 
	 */
	async quitGroup(groupId) {
		return await this.adaptor.quitGroup(groupId)
	}

	/**
	 * 获取群组资料
	 * 
	 * @param {*} groupId 
	 */
	async fetchGroupInfo(groupId) {
		return await this.adaptor.fetchGroupInfo(groupId)
	}
}