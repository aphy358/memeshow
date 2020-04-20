import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 加入购物车消息
 */
export default class XIMLivePurchasingMessage extends IMCustomMessage {

	messageType() {
		return "XIMLivePurchasingMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.Purchasing, payload)
		this.products = payload.products
	}

	toPayload() {
		return {
			products: this.products,
		}
	}

}