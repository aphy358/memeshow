import IMMessage from './base'

/**
 * 语音消息
 */
export default class IMAudioMessage extends IMMessage {

	messageType() {
		return "IMAudioMessage"
	}

	constructor(payload = {}) {
		super(payload)

		this.audioId = payload.audioId || ""
		this.url = payload.url || ""
		this.size = payload.size || 0
		this.duration = payload.duration || 0
	}
}

