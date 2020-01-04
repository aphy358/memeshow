/**
 * 消息方向
 */
export const IMMessageDirection = Object.freeze({
	// 接收
	in: 0,
	// 发送
	out: 1
})

/**
 * 消息状态
 */
export const IMMessageStatus = Object.freeze({
	// 未发送
	pending: 0,
	// 发送中
	sending: 1,
	// 发送成功
	successful: 2,
	// 发送失败 
	failed: 3
})
