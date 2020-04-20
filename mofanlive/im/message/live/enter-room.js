import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 用户进入直播间消息
 */
export default class XIMLiveEnterRoomMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveEnterRoomMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.EnterRoom, payload)
		this.channel = payload.channel
	}

	toPayload() {
		return {
			channel: this.channel,
		}
	}

}