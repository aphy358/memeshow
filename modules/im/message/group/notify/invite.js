import IMGroupNotifyMessage from './base'

/**
 * 被邀请通知 - 被邀请人接收
 */
export default class IMGroupInviteNotifyMessage extends IMGroupNotifyMessage {
	messageType() {
		return "IMGroupInviteNotifyMessage"
	}
	// 邀请人 IMUser
	invitor = null
	// 邀请留言
	message = ""
}