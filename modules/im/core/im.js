import _ from 'lodash'
import EventEmitter from 'events'
import createAdaptor from '../adaptors'
import Constant from './constant'

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
		this.delegator = delegator
		this.events = new EventEmitter()
		this.adaptor = createAdaptor(platform, options, delegator, this.events)

		// 拦截消息事件，根据类型派发消息
		this.activeMessageTypes = {}
		this.events.on(Constant.IMEvent.Messages, messages => {
			const messageTypes = _.keys(this.activeMessageTypes)
			_.each(messages, message => {
				_.each(messageTypes, messageType => {
					if (message.messageType() === messageType) {
						this.events.emit(messageType, message)
					}
				})
			})
		})
	}

	/**
	 * 监听IM事件
	 * 
	 * @param {*} evt 
	 * @param {*} fn 
	 */
	on(evt, fn) {
		this.events.on(evt, fn)
	}

	/**
	 * 取消监听IM事件
	 * 
	 * @param {*} evt 
	 * @param {*} fn 
	 */
	off(evt, fn) {
		this.events.off(evt, fn)
	}

	/**
	 * 接收指定类型的消息
	 * 
	 * @param {*} clz 	消息构造函数
	 * @param {*} fn 
	 */
	onMessage(clz, fn) {
		const messageType = new clz().messageType()
		this.activeMessageTypes[messageType] = true
		this.events.on(messageType, fn)
	}

	/**
	 * 取消接收指定类型的消息
	 * @param {*} clz 
	 * @param {*} fn 
	 */
	offMessage(clz, fn) {
		this.events.off(clz, fn)
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
	 * 解散群
	 */
	async dismissGroup(groupID) {
		return await this.adaptor.dismissGroup(groupID)
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
		return await this.adaptor.fetchSessionInfo(sessionId)
	}

	/**
	 * 删除会话
	 * 
	 * @param {*} sessionId 
	 */
	async deleteSession(sessionId) {
		return await this.adaptor.deleteSession(sessionId)
	}

	/**
	 * 获取会话中的消息
	 * 
	 * @param {*} sessionId 
	 * @param {*} cursor 
	 * @param {*} limit 
	 */
	async fetchSessionMessages(sessionId, cursor, limit) {
		return await this.adaptor.fetchSessionMessages(sessionId, cursor, limit)
	}

	/**
	 * 标记会话中的消息全部已读
	 * 
	 * @param {*} sessionId 
	 */
	async setSessionRead(sessionId) {
		return await this.adaptor.setSessionRead(sessionId)
	}

	/**
	 * 获取当前登录用户的个人资料
	 */
	async fetchMyInfo() {
		return await this.adaptor.fetchMyInfo()
	}

	/**
	 * 批量获取用户资料
	 * 
	 * @param {*} userIds 
	 */
	async fetchUserInfos(userIds) {
		return await this.adaptor.fetchUserInfos(userIds)
	}

	/**
	 * 发送消息给用户
	 * 
	 * @param {*} userId		用户
	 * @param {*} message 	消息
	 */
	async sendMessageToUser(userId, message) {
		return await this.adaptor.sendMessageToUser(userId, message)
	}

	/**
	 * 发送群消息
	 * 
	 * @param {*} groupId		群组
	 * @param {*} message 	消息
	 */
	async sendMessageToGroup(groupId, message) {
		return await this.adaptor.sendMessageToGroup(groupId, message)
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
	 * 获取用户群组列表
	 */
	async fetchGroups() {
		return await this.adaptor.fetchGroups()
	}

	/**
	 * 获取群组资料
	 * 
	 * @param {*} groupId 
	 */
	async fetchGroupInfo(groupId) {
		return await this.adaptor.fetchGroupInfo(groupId)
	}

	/**
	 * 获取群组成员分页数据
	 * 
	 * @param {*} groupId 
	 * @param {*} pageNo 
	 * @param {*} pageSize 
	 */
	async fetchGroupMembersPage(groupId, pageNo, pageSize) {
		return await this.adaptor.fetchGroupMembersPage(groupId, pageNo, pageSize)
	}

	/**
	 * 批量获取群组成员资料
	 * 
	 * @param {*} groupId 
	 * @param {*} userIds 
	 */
	async fetchGroupMemberInfos(groupId, userIds) {
		return await this.adaptor.fetchGroupMemberInfos(groupId, userIds)
	}
}