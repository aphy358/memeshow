import IMGroupNotifyMessage from './base'

/**
 * 用户请求加入群组通知 - 群主/管理员接收
 */
export default class IMGroupJoinNotifyMessage extends IMGroupNotifyMessage {
	// 请求用户 IMUser
	user = null
	// 申请加群的留言
	message = ""
}