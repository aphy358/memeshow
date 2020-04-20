import IMGroupTipMessage from './base'

/**
 * 取消管理员通知
 */
export default class IMGroupUnsetAdminTipMessage extends IMGroupTipMessage {
	messageType() {
		return "IMGroupUnsetAdminTipMessage"
	}
	// 被取消管理员的用户 IMUser
	users = []
	// 操作人
	operator = null
}