import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 用户购买消息
 */
export default class XIMLivePurchasedMessage extends IMCustomMessage {

	messageType() {
		return "XIMLivePurchasedMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.Purchased, payload)
		this.products = payload.products
	}

	toPayload() {
		return {
			products: this.products,
		}
	}

}