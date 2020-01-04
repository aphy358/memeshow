import IMMessage from './base'

/**
 * 语音消息
 */
export default class IMAudioMessage extends IMMessage {
	// 语音ID
	audioId = ""
	// 语音链接
	url = ""
	// 大小
	size = 0
	// 时长(s)
	duration = 0
}

