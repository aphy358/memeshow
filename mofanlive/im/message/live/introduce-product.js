import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 设置正在解说商品消息
 */
export default class XIMLiveIntroduceProductMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveIntroduceProductMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.IntroduceProduct, payload)
		this.roomId = payload.roomId
		this.productId = payload.productId
	}

	toPayload() {
		return {
			roomId: this.roomId,
			productId: this.productId,
		}
	}

}