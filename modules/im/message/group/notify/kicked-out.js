import IMGroupNotifyMessage from './base'

/**
 * 被踢通知 - 被踢人接收
 */
export default class IMGroupKickedOutNotifyMessage extends IMGroupNotifyMessage {
	// 操作人 IMUser
	operator = null
}