import IMMessage from './base'

/**
 * 短视频消息
 */
export default class IMVideoMessage extends IMMessage {

	messageType() {
		return "IMVideoMessage"
	}

	constructor(payload = {}) {
		super(payload)

		// 视频ID
		this.videoId = payload.videoId || ""

		// 格式
		this.format = payload.format || ""

		// 时长(s)
		this.duration = payload.duration || 0

		// 大小
		this.size = payload.size || 0

		// 链接地址
		this.url = payload.url || ""

		// 缩略图ID
		this.thumbId = payload.thumbId || ""

		// 缩略图大小
		this.thumbSize = payload.thumbSize || 0

		// 缩略图宽
		this.thumbWidth = payload.thumbWidth || 0

		// 缩略图高
		this.thumbHeight = payload.thumbHeight || 0

		// 缩略图链接地址
		this.thumbUrl = payload.thumbUrl || ""
	}
}