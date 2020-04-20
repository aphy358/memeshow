import IMGroupNotifyMessage from './base'

/**
 * 用户自定义通知 - 默认全员接收
 */
export default class IMGroupCustomNotifyMessage extends IMGroupNotifyMessage {

	messageType() {
		return "IMGroupCustomNotifyMessage"
	}

	// 自定义消息类型
	type = ""

	// 自定义消息数据
	payload = {}

	constructor(type, payload = {}) {
		super()
		this.type = type
		this.payload = payload
		this.fromPayload(payload)
	}

	/**
	 * 从payload解析出数据
	 * 
	 * @param {*} payload 
	 */
	fromPayload(payload) {
		throw new Error('not implemented!')
	}

	/**
	 * 将数据封装为payload
	 */
	toPayload() {
		throw new Error('not implemented!')
	}

}