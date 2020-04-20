import IMMessage from './base'

/**
 * 文本消息
 */
export default class IMTextMessage extends IMMessage {

	messageType() {
		return "IMTextMessage"
	}

	constructor(payload = {}) {
		super(payload)

		// 文本内容
		this.text = payload.text || ""
	}
}