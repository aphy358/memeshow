import { IMCustomMessage } from 'im/message'
import XIMMessageTypes from '../types'

/**
 * 直播 —— 优惠券/红包消息
 */
export default class XIMLiveCouponMessage extends IMCustomMessage {

	messageType() {
		return "XIMLiveCouponMessage"
	}

	constructor(payload = {}) {
		super(XIMMessageTypes.Live.Coupon, payload)
		this.couponId = payload.couponId
	}

	toPayload() {
		return {
			couponId: this.couponId,
		}
	}

}