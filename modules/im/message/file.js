import IMMessage from './base'

/**
 * 文件消息
 */
export default class IMFileMessage extends IMMessage {
	// 文件ID
	fileId = ""
	// 文件名
	name = ""
	// 链接地址
	url = ""
	// 大小
	size = 0
}