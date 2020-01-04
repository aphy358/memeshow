/**
 * 会话信息
 */
export default class IMSession {
	// 会话ID
	id = ""
	// 未读消息计数器
	unreadCount = 0
	// 最新消息 IMMessage
	lastMessage = null
	// 最新消息显示文本
	lastMessageDisplay = ""
}