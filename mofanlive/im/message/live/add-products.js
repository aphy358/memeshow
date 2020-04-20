import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 添加直播间商品
 */
export default class XIMLiveAddProductsMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveAddProductsMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.IntroduceProduct, payload)
		this.roomId = payload.roomId
		this.products = payload.products
	}

	toPayload() {
		return {
			roomId: this.roomId,
			products: this.products,
		}
	}

}