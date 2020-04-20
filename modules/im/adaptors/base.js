/**
 * IM适配器，适配不同平台的SDK
 */
export default class IMAdaptor {

	constructor(options, delegator, events) {
		this.options = options
		this.delegator = delegator
		this.events = events
	}

	async login() {
		throw new Error('not implemented!')
	}

	async logout() {
		throw new Error('not implemented!')
	}

	async dismissGroup() {
		throw new Error('not implemented!')
	}

	async fetchSessions() {
		throw new Error('not implemented!')
	}

	async fetchSessionInfo(sessionId) {
		throw new Error('not implemented!')
	}

	async deleteSession(sessionId) {
		throw new Error('not implemented!')
	}

	async fetchSessionMessages(sessionId, cursor, limit) {
		throw new Error('not implemented!')
	}

	async setSessionRead(sessionId) {
		throw new Error('not implemented!')
	}

	async fetchMyInfo() {
		throw new Error('not implemented!')
	}

	async fetchUserInfos(userIds) {
		throw new Error('not implemented!')
	}

	async sendMessageToUser(userId, message) {
		throw new Error('not implemented!')
	}

	async sendMessageToGroup(groupId, message) {
		throw new Error('not implemented!')
	}

	async joinPublicGroup(groupID, applyMessage) {
		throw new Error('not implemented!')
	}

	async joinChatRoom(groupID) {
		throw new Error('not implemented!')
	}

	async joinLiveRoom(groupID) {
		throw new Error('not implemented!')
	}

	async quitGroup(groupID) {
		throw new Error('not implemented!')
	}

	async fetchGroups() {
		throw new Error('not implemented!')
	}

	async fetchGroupInfo(groupID) {
		throw new Error('not implemented!')
	}

	async fetchGroupMembersPage(groupId, pageNo, pageSize) {
		throw new Error('not implemented!')
	}

	async fetchGroupMemberInfos(groupId, userIds) {
		throw new Error('not implemented!')
	}
}