import IMMessage from './base'

/**
 * 用户自定义消息基类
 */
export default class IMCustomMessage extends IMMessage {

	messageType() {
		return "IMCustomMessage"
	}

	isCustomMessage() {
		return true
	}

	constructor(type = "", payload = {}) {
		super(payload)

		this.type = type
		this.payload = payload
	}

	/**
	 * 从payload解析出数据
	 * 
	 * @param {*} payload 
	 */
	// fromPayload(payload) {
	// 	throw new Error('not implemented!')
	// }

	/**
	 * 将数据封装为payload
	 */
	toPayload() {
		throw new Error('not implemented!')
	}
}