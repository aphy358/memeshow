import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 用户分享消息
 */
export default class XIMLiveShareLiveMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveShareLiveMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.ShareLive, payload)
		this.liveId = payload.liveId
	}

	toPayload() {
		return {
			liveId: this.liveId,
		}
	}

}