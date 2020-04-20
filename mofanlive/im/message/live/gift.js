import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 用户打赏消息
 */
export default class XIMLiveGiftMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveGiftMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.Gift, payload)
		this.gifts = payload.gifts
	}

	toPayload() {
		return {
			gifts: this.gifts,
		}
	}

}