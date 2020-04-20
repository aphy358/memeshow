import { IMMessageStatus, IMMessageDirection } from './constant'

/**
 * 消息基类
 */
export default class IMMessage {

	/**
	 * TODO: 小程序Page会生成新的上下文，导致同一个 class，直接 instanceOf 失败
	 * 直接比较 clazz.constructor.name，会因为js混淆，导致失败
	 * 因此，需要显式说明消息类型
	 */
	messageType() {
		throw new Error("must have messageType!")
	}

	// 消息ID
	id = ""

	// 消息序号
	seq = 0

	// 所属会话
	sessionId = ""

	// 发送者ID
	fromId = ""

	// 发送者昵称
	fromName = ""

	// 发送者头像
	fromAvatar = ""

	// 接收者ID
	toId = ""

	// 消息方向
	direction = IMMessageDirection.in

	// 发送时间戳(ms)
	sendTime = ""

	// 是否已读
	isRead = 0

	// 是否重发消息
	isResend = 0

	// 消息状态
	status = IMMessageStatus.pending
}
