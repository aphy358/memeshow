import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 弹幕消息
 */
export default class XIMLiveBarrageMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveBarrageMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.Barrage, payload)
		this.text = payload.text
	}

	toPayload() {
		return {
			text: this.text,
		}
	}

}