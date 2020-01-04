import IMMessage from './base'

/**
 * 短视频消息
 */
export default class IMVideoMessage extends IMMessage {
	// 视频ID
	videoId = ""
	// 格式
	format = ""
	// 时长(s)
	duration = 0
	// 大小
	size = 0
	// 链接地址
	url = ""
	// 缩略图ID
	thumbId = ""
	// 缩略图大小
	thumbSize = 0
	// 缩略图宽
	thumbWidth = 0
	// 缩略图高
	thumbHeight = 0
	// 缩略图链接地址
	thumbUrl = ""
}