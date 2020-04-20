import IMMessage from './base'

/**
 * 文件消息
 */
export default class IMFileMessage extends IMMessage {

	messageType() {
		return "IMFileMessage"
	}

	constructor(payload = {}) {
		super(payload)

		this.fileId = payload.fileId || ""
		this.name = payload.name || ""
		this.url = payload.url || ""
		this.size = payload.size || 0
	}
}