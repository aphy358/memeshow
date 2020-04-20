import IMGroupTipMessage from './base'

/**
 * 设置管理员通知
 */
export default class IMGroupSetAdminTipMessage extends IMGroupTipMessage {
	messageType() {
		return "IMGroupSetAdminTipMessage"
	}
	// 设置的管理员用户 IMUser
	users = []
	// 设置人 IMUser
	operator = null
}