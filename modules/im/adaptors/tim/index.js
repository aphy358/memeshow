import _ from 'lodash'
import TIM from 'tim-wx-sdk';
import COS from 'cos-wx-sdk-v5';
import IMAdaptor from '../base';
import Constant from '../../core/constant'
import { IMUser, IMPrivateGroup, IMPublicGroup, IMChatRoomGroup, IMLiveRoomGroup, IMGroupMember } from '../../profile'
import { IMUserSession, IMSystemSession, IMPrivateGroupSession, IMPublicGroupSession, IMChatRoomGroupSession, IMLiveRoomGroupSession } from '../../session';
import { IMTextMessage, IMImageMessage, IMVideoMessage, IMFileMessage, IMCustomMessage, IMGeoMessage, IMGroupNotifyMessage, IMImage, IMAudioMessage, IMGroupJoinTipMessage, IMGroupQuitTipMessage, IMGroupKickoutTipMessage, IMGroupSetAdminTipMessage, IMGroupUnsetAdminTipMessage, IMGroupUpdateTipMessage, IMGroupMemberUpdateTipMessage, IMGroupJoinNotifyMessage, IMGroupJoinApprovedNotifyMessage, IMGroupJoinDeclinedNotifyMessage, IMGroupKickedOutNotifyMessage, IMGroupDismissedNotifyMessage, IMGroupCreatedNotifyMessage, IMGroupInviteNotifyMessage, IMGroupQuitNotifyMessage, IMGroupSetAdminNotifyMessage, IMGroupUnsetAdminNotifyMessage, IMGroupCustomNotifyMessage } from '../../message'

/**
 * 腾讯云通信
 * 
 * https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/index.html
 */
export default class TimAdaptor extends IMAdaptor {

	constructor(options, delegator, events) {
		super(options, delegator, events)
		const tim = TIM.create({ SDKAppID: options.appId })
		tim.setLogLevel(options.logLevel || 0)
		tim.registerPlugin({ 'cos-wx-sdk': COS });
		this.tim = tim
		this.listenEvents()
	}

	listenEvents() {

		this.tim.on(TIM.EVENT.SDK_READY, () => this.events.emit(Constant.IMEvent.Ready))

		this.tim.on(TIM.EVENT.SDK_NOT_READY, () => this.events.emit(Constant.IMEvent.Unready))

		this.tim.on(TIM.EVENT.ERROR, evt => this.events.emit(Constant.IMEvent.Error, _.pick(evt.data, ["code", "message"])))

		this.tim.on(TIM.EVENT.KICKED_OUT, evt => {
			switch (evt.data.type) {
				case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT: {
					this.events.emit(Constant.IMEvent.KickedOut, Constant.IMKickedOutReason.MultiLogin)
					break
				}
				case TIM.TYPES.KICKED_OUT_MULT_DEVICE: {
					this.events.emit(Constant.IMEvent.KickedOut, Constant.IMKickedOutReason.MultiDevice)
					break
				}
				case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED: {
					this.events.emit(Constant.IMEvent.KickedOut, Constant.IMKickedOutReason.SignExpired)
					break
				}
				default: {
					this.events.emit(Constant.IMEvent.KickedOut, Constant.IMKickedOutReason.Unknown)
					break
				}
			}
		})

		this.tim.on(TIM.EVENT.GROUP_LIST_UPDATED, evt => {
			this.events.emit(Constant.IMEvent.Groups, _.map(evt.data, this.toIMGroup.bind(this)))
		})

		this.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, evt => this.events.emit(Constant.IMEvent.Sessions, _.map(evt.data, this.toIMSession.bind(this))))

		this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, evt => this.events.emit(Constant.IMEvent.Messages, _.map(evt.data, this.toIMMessage.bind(this))))

		this.tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, evt => this.events.emit(Constant.IMEvent.Messages, [this.toIMMessage(evt.data.message)]))
	}

	async login() {
		const credentials = await this.delegator.loginCredentials()
		return await this.tim.login(credentials)
	}

	async logout() {
		return await this.tim.logout()
	}

	async dismissGroup(groupID) {
		return await this.tim.dismissGroup(groupID)
	}

	async fetchSessions() {
		const rsp = await this.tim.getConversationList()
		const conversationList = rsp.data.conversationList
		return _.map(conversationList, this.toIMSession)
	}

	async fetchSessionInfo(sessionId) {
		const rsp = await this.tim.getConversationProfile(sessionId)
		return this.toIMSession(rsp.data.conversation)
	}

	async deleteSession(sessionId) {
		const rsp = await this.tim.deleteConversation(sessionId)
		const { conversationID } = rsp.data
		return sessionId === conversationID
	}

	async fetchSessionMessages(sessionId, cursor, limit) {
		let rsp
		if (!cursor) {
			// 打开某个会话时，第一次拉取消息列表
			rsp = await this.tim.getMessageList({ conversationID: sessionId, count: limit })
		} else {
			// 下拉查看更多消息
			rsp = await this.tim.getMessageList({ conversationID: sessionId, nextReqMessageID: cursor, count: limit })
		}
		return {
			messages: _.map(rsp.data.messageList, this.toIMMessage),
			cursor: rsp.data.nextReqMessageID,
			more: !imResponse.data.isCompleted
		}
	}

	async setSessionRead(sessionId) {
		// 将某会话下所有未读消息已读上报
		await this.tim.setMessageRead({ conversationID: sessionId })
	}

	async fetchMyInfo() {
		const rsp = await this.tim.getMyProfile()
		return this.toIMUser(rsp.data)
	}

	async fetchUserInfos(userIds) {
		const rsp = await this.tim.getUserProfile({ userIDList: userIds })
		return _.map(rsp.data, this.toIMUser)
	}

	async sendMessageToUser(userId, message) {
		return await this.sendMessage(this.toTimMessage(userId, TIM.TYPES.CONV_C2C, message))
	}

	async sendMessageToGroup(groupId, message) {
		return await this.sendMessage(this.toTimMessage(groupId, TIM.TYPES.CONV_GROUP, message))
	}

	async sendMessage(message) {
		await this.tim.sendMessage(message);
	}

	async joinPublicGroup(groupID, applyMessage) {
		const rsp = await this.tim.joinGroup({
			groupID,
			applyMessage,
			type: TIM.TYPES.GRP_PUBLIC
		})
		switch (rsp.data.status) {
			case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: {
				// 等待审核
				return { result: Constant.IMJoinGroupResult.WaitApproval }
			}
			case TIM.TYPES.JOIN_STATUS_SUCCESS: {
				// 加群成功
				return { result: Constant.IMJoinGroupResult.Success }
			}
			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: {
				// 已经在群中
				return { result: Constant.IMJoinGroupResult.AlreadyJoined }
			}
			default: {
				throw new Error(`加入公开群组结果异常：${rsp.data.status}`)
			}
		}
	}

	async joinChatRoom(groupID) {
		const rsp = await this.tim.joinGroup({
			groupID,
			applyMessage: "",
			type: TIM.TYPES.GRP_CHATROOM
		})
		switch (rsp.data.status) {
			case TIM.TYPES.JOIN_STATUS_SUCCESS: {
				// 加群成功
				return { result: Constant.IMJoinGroupResult.Success }
			}
			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: {
				// 已经在群中
				return { result: Constant.IMJoinGroupResult.AlreadyJoined }
			}
			default: {
				throw new Error(`加入聊天室结果异常：${rsp.data.status}`)
			}
		}
	}

	async joinLiveRoom(groupID) {
		const rsp = await this.tim.joinGroup({
			groupID: groupID,
			type: TIM.TYPES.GRP_AVCHATROOM
		})
		
		switch (rsp.data.status) {
			case TIM.TYPES.JOIN_STATUS_SUCCESS: {
				// 加群成功
				return { result: Constant.IMJoinGroupResult.Success }
			}
			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: {
				// 已经在群中
				return { result: Constant.IMJoinGroupResult.AlreadyJoined }
			}
			default: {
				throw new Error(`加入直播间结果异常：${rsp.data.status}`)
			}
		}
	}

	async quitGroup(groupID) {
		await this.tim.quitGroup(groupID)
	}

	async fetchGroups() {
		const rsp = await this.tim.getGroupList()
		return _.map(rsp.data.groupList, this.toIMGroup)
	}

	async fetchGroupInfo(groupID) {
		const rsp = await this.tim.getGroupProfile({ groupID })
		return this.toIMGroup(rsp.data.group)
	}

	async fetchGroupMembersPage(groupId, pageNo, pageSize) {
		const rsp = await this.tim.getGroupMemberList({ groupID: groupId, count: pageSize, offset: (pageNo - 1) * pageSize })
		return _.map(rsp.data.memberList, this.toIMGroupMember)
	}

	async fetchGroupMemberInfos(groupId, userIds) {
		const rsp = await this.tim.getGroupMemberProfile({ groupID: groupId, userIDList: userIds })
		return _.map(rsp.data.memberList, this.toIMGroupMember)
	}

	toIMGroupMember(timMember) {
		const member = new IMGroupMember()
		member.userId = timMember.userID
		member.avatar = timMember.avatar
		member.nickname = timMember.nick
		member.isAdmin = timMember.role === TIM.TYPES.GRP_MBR_ROLE_ADMIN
		member.isOwner = timMember.role === TIM.TYPES.GRP_MBR_ROLE_OWNER
		return member
	}

	toIMSession(timConversation) {
		let session
		switch (timConversation.type) {
			case TIM.TYPES.CONV_C2C: {
				session = new IMUserSession()
				session.user = this.toIMUser(timConversation.userProfile)
				break
			}
			case TIM.TYPES.CONV_SYSTEM: {
				session = new IMSystemSession()
				break
			}
			case TIM.TYPES.CONV_GROUP: {
				switch (timConversation.groupProfile.type) {
					case TIM.TYPES.GRP_PRIVATE: {
						session = new IMPrivateGroupSession()
						break
					}
					case TIM.TYPES.GRP_PUBLIC: {
						session = new IMPublicGroupSession()
						break
					}
					case TIM.TYPES.GRP_CHATROOM: {
						session = new IMChatRoomGroupSession()
						break
					}
					case TIM.TYPES.GRP_AVCHATROOM: {
						session = new IMLiveRoomGroupSession()
						break
					}
					default: {
						throw new Error(`未知群组会话类型: ${timConversation.subType}`)
					}
				}
				session.group = this.toIMGroup(timConversation.groupProfile)
			}
			default: {
				// TODO 很多类型未处理
				return
				throw new Error(`未知会话类型: ${timConversation.type}`)
			}
		}
		session.id = timConversation.conversationID
		session.unreadCount = timConversation.unreadCount
		session.lastMessageDisplay = (timConversation.lastMessage && timConversation.lastMessage.messageForShow) || ''
		session.lastMessage = this.toIMMessage(timConversation.lastMessage)
		return session
	}

	toIMTextMessage(payload) {
		const message = new IMTextMessage()
		message.clz = IMTextMessage.clz
		message.text = payload.text
		return message
	}

	toIMImageMessage(payload) {
		const message = new IMImageMessage()
		message.imageId = payload.uuid
		message.format = payload.imageFormat
		message.images = _.map(payload.imageInfoArray, it => {
			const image = new IMImage()
			image.width = it.width
			image.height = it.height
			image.url = it.url
			image.size = it.size
			image.compress = it.sizeType
			return image
		})
		return message
	}

	toIMAudioMessage(payload) {
		const message = new IMAudioMessage()
		message.audioId = payload.uuid
		message.url = payload.url
		message.size = payload.size
		message.duration = payload.second
		return message
	}

	toIMVideoMessage(payload) {
		const message = new IMVideoMessage()
		message.format = payload.videoFormat
		message.duration = payload.videoSecond
		message.size = payload.videoSize
		message.url = payload.videoUrl
		message.videoId = payload.videoUUID
		message.thumbId = payload.thumbUUID
		message.thumbSize = payload.thumbSize
		message.thumbWidth = payload.thumbWidth
		message.thumbHeight = payload.thumbHeight
		message.thumbUrl = payload.thumbUrl
		return message
	}

	toIMFileMessage(payload) {
		const message = new IMFileMessage()
		message.fileId = payload.uuid
		message.name = payload.fileName
		message.url = payload.fileUrl
		message.size = payload.fileSize
		return message
	}

	toIMCustomMessage(timMessage) {
		const data = timMessage.data
		try {
			const parsed = JSON.parse(data)
			if (parsed.type) {
				return this.delegator.createCustomMessage(parsed.type, parsed.payload || {})
			}
		} catch (e) { }
		throw new Error(`invalid custom message: ${ JSON.stringify(timMessage) }`)
	}

	toIMGeoMessage(payload) {
		const message = new IMGeoMessage()
		message.location = payload.description
		message.latitude = payload.latitude
		message.longitude = payload.longitude
		return message
	}

	toIMGroupTipMessage(payload) {
		let message
		switch (payload.operationType) {
			case TIM.TYPES.GRP_TIP_MBR_JOIN: {
				message = new IMGroupJoinTipMessage()
				message.users = _.map(payload.userIDList, it => {
					const user = new IMUser()
					user.id = it
					return user
				})
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case TIM.TYPES.GRP_TIP_MBR_QUIT: {
				message = new IMGroupQuitTipMessage()
				message.users = _.map(payload.userIDList, it => {
					const user = new IMUser()
					user.id = it
					return user
				})
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT: {
				message = new IMGroupKickoutTipMessage()
				message.users = _.map(payload.userIDList, it => {
					const user = new IMUser()
					user.id = it
					return user
				})
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case TIM.TYPES.GRP_TIP_MBR_SET_ADMIN: {
				message = new IMGroupSetAdminTipMessage()
				message.users = _.map(payload.userIDList, it => {
					const user = new IMUser()
					user.id = it
					return user
				})
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN: {
				message = new IMGroupUnsetAdminTipMessage()
				message.users = _.map(payload.userIDList, it => {
					const user = new IMUser()
					user.id = it
					return user
				})
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED: {
				message = new IMGroupUpdateTipMessage()
				message.group = this.toIMGroup(payload.newGroupProfile)
				break
			}
			case TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED: {
				message = new IMGroupMemberUpdateTipMessage()
				message.members = _.map(payload.memberList, it => {
					const member = new IMGroupMember()
					member.userId = it.userID
					return member
				})
				break
			}
			default: {
				throw new Error(`未知的群组提示消息: ${payload.operationType}`)
			}
		}
		return message
	}

	toIMGroupNotifyMessage(payload) {
		let message
		switch (payload.operationType) {
			case 1: {
				message = new IMGroupJoinNotifyMessage(payload)
				const user = new IMUser()
				user.id = payload.operatorID
				message.user = user
				message.message = payload.handleMessage
				break
			}
			case 2: {
				message = new IMGroupJoinApprovedNotifyMessage(payload)
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 3: {
				message = new IMGroupJoinDeclinedNotifyMessage(payload)
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 4: {
				message = new IMGroupKickedOutNotifyMessage(payload)
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 5: {
				message = new IMGroupDismissedNotifyMessage(payload)
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 6: {
				message = new IMGroupCreatedNotifyMessage(payload)
				break
			}
			case 7: {
				message = new IMGroupInviteNotifyMessage(payload)
				const invitor = new IMUser()
				invitor.id = payload.operatorID
				message.invitor = invitor
				break
			}
			case 8: {
				message = new IMGroupQuitNotifyMessage(payload)
				break
			}
			case 9: {
				message = new IMGroupSetAdminNotifyMessage(payload)
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 10: {
				message = new IMGroupUnsetAdminNotifyMessage(payload)
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 255: {
				try {
					const parsed = JSON.parse(payload.data)
					if (parsed.type) {
						return this.delegator.createCustomMessage(parsed.type, parsed.payload || {})
					}
				} catch (e) { }
				throw new Error(`invalid custom message payload: ${payload}`)
			}
			default: {
				throw new Error(`未知的群通知类型: ${payload.operationType}`)
			}
		}
		message.group = this.toIMGroup(payload.groupProfile)
		return message
	}

	toIMMessage(timMessage) {
		let message
		const payload = timMessage.payload
		switch (timMessage.type) {
			case TIM.TYPES.MSG_TEXT: {
				message = this.toIMTextMessage(payload)
				break
			}
			case TIM.TYPES.MSG_IMAGE: {
				message = this.toIMImageMessage(payload)
				break
			}
			case TIM.TYPES.MSG_AUDIO: {
				message = this.toIMAudioMessage(payload)
				break
			}
			case TIM.TYPES.MSG_VIDEO: {
				message = this.toIMVideoMessage(payload)
				break
			}
			case TIM.TYPES.MSG_FILE: {
				message = this.toIMFileMessage(payload)
				break
			}
			case TIM.TYPES.MSG_CUSTOM: {
				message = this.toIMCustomMessage(payload)
				break
			}
			case TIM.TYPES.MSG_GEO: {
				message = this.toIMGeoMessage(payload)
				break
			}
			case TIM.TYPES.MSG_GRP_TIP: {
				message = this.toIMGroupTipMessage(payload)
				break
			}
			case TIM.TYPES.MSG_GRP_SYS_NOTICE: {
				message = this.toIMGroupNotifyMessage(payload)
				break
			}
			default: {
				throw new Error(`未知的消息类型: ${timMessage.type}`)
			}
		}

		return this.toIMMessagePayload(timMessage, message)
	}

	toIMUser(timUserProfile) {
		const user = new IMUser()
		user.id = timUserProfile.userID
		user.nickname = timUserProfile.nick
		user.avatar = timUserProfile.avatar
		return user
	}

	toIMGroup(timGroup) {
		// TODO 测试，原本返回的数据不知为何 type 为空，先写死
		timGroup.type = TIM.TYPES.GRP_AVCHATROOM
		
		let group
		switch (timGroup.type) {
			case TIM.TYPES.GRP_PRIVATE: {
				group = new IMPrivateGroup()
				break
			}
			case TIM.TYPES.GRP_PUBLIC: {
				group = new IMPublicGroup()
				break
			}
			case TIM.TYPES.GRP_CHATROOM: {
				group = new IMChatRoomGroup()
				break
			}
			case TIM.TYPES.GRP_AVCHATROOM: {
				group = new IMLiveRoomGroup()
				break
			}
			default: {
				throw new Error(`未知的群组类型: ${timGroup.type}`)
			}
		}
		group.id = timGroup.groupID
		group.name = timGroup.name
		group.avatar = timGroup.avatar
		group.ownerId = timGroup.ownerID
		group.memberCount = timGroup.memberNum
		group.intro = timGroup.introduction
		group.announcement = timGroup.notification
		return group
	}

	toTimMessage(to, conversationType, message) {

		// 用户自定义消息
		if (message.isCustomMessage && message.isCustomMessage()) {
			return this.tim.createCustomMessage({
				to,
				conversationType,
				payload: {
					data: JSON.stringify({
						type: message.type,
						payload: message.toPayload()
					})
				}
			})
		}

		if (this.instanceOf(message, IMTextMessage)) {
			return this.tim.createTextMessage({
				to,
				conversationType,
				payload: {
					text: message.text
				}
			})
		}

		if (this.instanceOf(message, IMImageMessage)) {
			// TODO @fioman
			throw new Error('not implemented!')
		}

		if (this.instanceOf(message, IMAudioMessage)) {
			// TODO @fioman
			throw new Error('not implemented!')
		}

		if (this.instanceOf(message, IMVideoMessage)) {
			// TODO @fioman
			throw new Error('not implemented!')
		}

		if (this.instanceOf(message, IMFileMessage)) {
			// TODO @fioman
			throw new Error('not implemented!')
		}

		if (this.instanceOf(message, IMGeoMessage)) {
			// TODO @fioman
			throw new Error('not implemented!')
		}

		if (this.instanceOf(message, IMGroupCustomNotifyMessage)) {
			// TODO @fioman
			throw new Error('not implemented!')
		}

		throw new Error(`不支持发送消息: ${message}`)
	}

	/**
	 * 小程序Page会创建新的上下文，导致原型链检查类型比较不一致
	 * 
	 * @param {*} message
	 * @param {*} clz 
	 */
	instanceOf(message, clz) {
		return message.messageType() === new clz().messageType()
	}

	/**
	 * 给目标信息赋值
	 * 
	 * @param {*} timMessage - 接收到的信息
	 * @param {*} message - 目标信息
	 */
	toIMMessagePayload(timMessage, message) {
		message.id = timMessage.ID
		message.seq = timMessage.sequence
		message.sessionId = timMessage.conversationID
		message.fromId =  timMessage.from
		message.fromName =  timMessage.nick
		message.fromAvatar =  timMessage.avatar
		message.toId = timMessage.to
		message.direction = timMessage.flow
		message.sendTime = timMessage.time
		message.isRead = timMessage.isRead
		message.isResend = timMessage.isResend
		message.status = timMessage.status

		return message
	}

}