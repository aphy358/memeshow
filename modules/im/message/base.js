import { IMMessageStatus, IMMessageDirection } from './constant'
/**
 * 消息基类
 */
export default class IMMessage {
	// 消息ID
	id = ""
	// 消息序号
	seq = 0
	// 所属会话
	sessionId = ""
	// 发送者ID
	fromId = ""
	// 接收者ID
	toId = ""
	// 消息方向
	direction = IMMessageDirection.in
	// 发送时间戳(ms)
	sendTime = 0
	// 是否已读
	isRead = false
	// 是否重发消息
	isResend = false
	// 消息状态
	status = IMMessageStatus.pending
}