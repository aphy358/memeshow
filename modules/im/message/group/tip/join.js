import IMGroupTipMessage from './base'

/**
 * 用户加入通知
 */
export default class IMGroupJoinTipMessage extends IMGroupTipMessage {
	messageType() {
		return "IMGroupJoinTipMessage"
	}
	// 加入的用户 IMUser
	users = []
	// 批准/邀请人 IMUser
	operator = null
}