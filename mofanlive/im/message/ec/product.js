import { IMCustomMessage } from 'im/message'

/**
 * 商品消息
 */
export default class XIMProductMessage extends IMCustomMessage {

	messageType() {
		return "XIMProductMessage"
	}

	constructor(payload = {}) {
		// super(XIMMessageTypes.Live.Barrage, payload)
		this.productId = payload.productId
		this.title = payload.title
		this.image = payload.image
	}

	toPayload() {
		return {
			productId: this.productId,
			title: this.title,
			image: this.image
		}
	}

}