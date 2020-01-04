import IMGroupNotifyMessage from './base'

/**
 * 加群申请被拒绝 - 申请人接收
 */
export default class IMGroupJoinDeclinedNotifyMessage extends IMGroupNotifyMessage {
	// 操作人 IMUser
	operator = null
	// 拒绝原因
	reason = ""
}