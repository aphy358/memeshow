import IMGroupNotifyMessage from './base'

/**
 * 被设置管理员通知 - 被设置人接收
 */
export default class IMGroupSetAdminNotifyMessage extends IMGroupNotifyMessage {
	// 设置人 IMUser
	operator = null
}