import IMGroupNotifyMessage from './base'

/**
 * 解散通知 - 全员接收
 */
export default class IMGroupDismissedNotifyMessage extends IMGroupNotifyMessage {
	messageType() {
		return "IMGroupDismissedNotifyMessage"
	}
	// 操作人 IMUser
	operator = null
}