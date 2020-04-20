import IMGroupNotifyMessage from './base'

/**
 * 被移除管理员通知 - 被移除人接收
 */
export default class IMGroupUnsetAdminNotifyMessage extends IMGroupNotifyMessage {
	messageType() {
		return "IMGroupUnsetAdminNotifyMessage"
	}
	// 操作人 IMUser
	operator = null
}