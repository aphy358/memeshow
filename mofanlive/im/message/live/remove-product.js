import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 删除直播间商品
 */
export default class XIMLiveRemoveProductsMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveRemoveProductsMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.IntroduceProduct, payload)
		this.roomId = payload.roomId
		this.productIds = payload.productIds
	}

	toPayload() {
		return {
			roomId: this.roomId,
			productIds: this.productIds,
		}
	}

}