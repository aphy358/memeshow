import IMGroupTipMessage from './base'

/**
 * 踢人通知
 */
export default class IMGroupKickoutTipMessage extends IMGroupTipMessage {
	messageType() {
		return "IMGroupKickoutTipMessage"
	}
	// 被踢的用户 IMUser
	users = []
	// 踢人 IMUser
	operator = null
}