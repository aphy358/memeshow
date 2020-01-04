import IMGroupTipMessage from './base'

/**
 * 用户退出通知
 */
export default class IMGroupQuitTipMessage extends IMGroupTipMessage {
	// 退出的用户 IMUser
	users = []
	// 批准人
	operator = null
}