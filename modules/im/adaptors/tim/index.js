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

	constructor(options, delegator) {
		super(options, delegator)
		const tim = TIM.create({ SDKAppID: options.appId })
		tim.setLogLevel(options.logLevel || 0)
		tim.registerPlugin({ 'cos-wx-sdk': COS });
		this.tim = tim
	}

	async login() {
		const credentials = await this.delegator.loginCredentials()
		return await this.tim.login(credentials)
	}

	async logout() {
		return await this.tim.logout()
	}

	async fetchSessions() {
		const rsp = await this.tim.getConversationList()
		const conversationList = rsp.data.conversationList
		return _.map(conversationList, this.toIMSession)
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
				return { result: Constant.IMJoinGroupResult.WaitApproval, group: null }
			}
			case TIM.TYPES.JOIN_STATUS_SUCCESS: {
				// 加群成功
				return { result: Constant.IMJoinGroupResult.Success, group: this.toIMGroup(rsp.data.group) }
			}
			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: {
				// 已经在群中
				return { result: Constant.IMJoinGroupResult.AlreadyJoined, group: null }
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
				return { result: Constant.IMJoinGroupResult.Success, group: this.toIMGroup(rsp.data.group) }
			}
			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: {
				// 已经在群中
				return { result: Constant.IMJoinGroupResult.AlreadyJoined, group: null }
			}
			default: {
				throw new Error(`加入聊天室结果异常：${rsp.data.status}`)
			}
		}
	}

	async joinLiveRoom(groupID) {
		const rsp = await this.tim.joinGroup({
			groupID,
			applyMessage: "",
			type: TIM.TYPES.GRP_AVCHATROOM
		})
		switch (rsp.data.status) {
			case TIM.TYPES.JOIN_STATUS_SUCCESS: {
				// 加群成功
				return { result: Constant.IMJoinGroupResult.Success, group: this.toIMGroup(rsp.data.group) }
			}
			case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: {
				// 已经在群中
				return { result: Constant.IMJoinGroupResult.AlreadyJoined, group: null }
			}
			default: {
				throw new Error(`加入直播间结果异常：${rsp.data.status}`)
			}
		}
	}

	async quitGroup(groupID) {
		await this.tim.quitGroup(groupID)
	}

	async fetchGroupInfo(groupID) {
		const rsp = await this.tim.getGroupProfile({ groupID })
		return this.toIMGroup(rsp.data.group)
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
				switch (timConversation.subType) {
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
				throw new Error(`未知会话类型: ${timConversation.type}`)
			}
		}
		session.id = timConversation.conversationID
		session.unreadCount = timConversation.unreadCount
		session.lastMessageDisplay = (timConversation.lastMessage && timConversation.lastMessage.messageForShow) || ''
		session.lastMessage = this.toIMMessage(timConversation.lastMessage)
		return session
	}

	toIMTextMessage(timMessage) {
		const message = new IMTextMessage()
		message.text = timMessage.payload.text
		return message
	}

	toIMImageMessage(timMessage) {
		const payload = timMessage.payload
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

	toIMAudioMessage(timMessage) {
		const payload = timMessage.payload
		const message = new IMAudioMessage()
		message.audioId = payload.uuid
		message.url = payload.url
		message.size = payload.size
		message.duration = payload.second
		return message
	}

	toIMVideoMessage(timMessage) {
		const payload = timMessage.payload
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

	toIMFileMessage(timMessage) {
		const payload = timMessage.payload
		const message = new IMFileMessage()
		message.fileId = payload.uuid
		message.name = payload.fileName
		message.url = payload.fileUrl
		message.size = payload.fileSize
		return message
	}

	toIMCustomMessage(timMessage) {
		const message = new IMCustomMessage()
		return message
	}

	toIMGeoMessage(timMessage) {
		const payload = timMessage.payload
		const message = new IMGeoMessage()
		message.location = payload.description
		message.latitude = payload.latitude
		message.longitude = payload.longitude
		return message
	}

	toIMGroupTipMessage(timMessage) {
		const payload = timMessage.payload
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

	toIMGroupNotifyMessage(timMessage) {
		const payload = timMessage.payload
		let message
		switch (payload.operationType) {
			case 1: {
				message = new IMGroupJoinNotifyMessage()
				const user = new IMUser()
				user.id = payload.operatorID
				message.user = user
				message.message = payload.handleMessage
				break
			}
			case 2: {
				message = new IMGroupJoinApprovedNotifyMessage()
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 3: {
				message = new IMGroupJoinDeclinedNotifyMessage()
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 4: {
				message = new IMGroupKickedOutNotifyMessage()
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 5: {
				message = new IMGroupDismissedNotifyMessage()
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 6: {
				message = new IMGroupCreatedNotifyMessage()
				break
			}
			case 7: {
				message = new IMGroupInviteNotifyMessage()
				const invitor = new IMUser()
				invitor.id = payload.operatorID
				message.invitor = invitor
				break
			}
			case 8: {
				message = new IMGroupQuitNotifyMessage()
				break
			}
			case 9: {
				message = new IMGroupSetAdminNotifyMessage()
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 10: {
				message = new IMGroupUnsetAdminNotifyMessage()
				const operator = new IMUser()
				operator.id = payload.operatorID
				message.operator = operator
				break
			}
			case 255: {
				message = new IMGroupCustomNotifyMessage()
				break
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
		switch (timMessage.type) {
			case TIM.TYPES.MSG_TEXT: {
				message = this.toIMTextMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_IMAGE: {
				message = this.toIMImageMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_AUDIO: {
				message = this.toIMAudioMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_VIDEO: {
				message = this.toIMVideoMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_FILE: {
				message = this.toIMFileMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_CUSTOM: {
				message = this.toIMCustomMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_GEO: {
				message = this.toIMGeoMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_GRP_TIP: {
				message = this.toIMGroupTipMessage(timMessage)
				break
			}
			case TIM.TYPES.MSG_GRP_SYS_NOTICE: {
				message = this.toIMGroupNotifyMessage(timMessage)
				break
			}
			default: {
				throw new Error(`未知的消息类型: ${timMessage.type}`)
			}
		}
		return message
	}

	toIMUser(timUserProfile) {
		const user = new IMUser()
		user.id = timUserProfile.userID
		user.nickname = timUserProfile.nick
		user.avatar = timUserProfile.avatar
		return user
	}

	toIMGroup(timGroup) {
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

}