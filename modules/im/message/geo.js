import IMMessage from './base'

/**
 * 位置消息
 */
export default class IMGeoMessage extends IMMessage {

	messageType() {
		return "IMGeoMessage"
	}

	constructor(payload = {}) {
		super(payload)

		this.location = payload.location || ""
		this.latitude = payload.latitude || 0
		this.longitude = payload.longitude || 0
	}
}