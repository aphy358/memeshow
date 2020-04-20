import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 用户关注主播消息
 */
export default class XIMLiveSubscribeMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveSubscribeMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.Subscribe, payload)
	}

	toPayload() {
		return {
		}
	}

}