import IMMessage from './base'

/**
 * 用户自定义消息基类
 */
export default class IMCustomMessage extends IMMessage {

	// 自定义消息类型
	type = ""

	// 自定义消息数据
	payload = {}

	/**
	 * 解析用户数据
	 * 
	 * @param {*} data 
	 */
	unmarshallCustomData(data) {
		try {
			const parsed = JSON.parse(data)
			if (parsed.type) {
				this.type = parsed.type
				this.payload = parsed.payload || {}
				return
			}
		} catch (e) { }
		throw new Error(`invalid custom message payload: ${data}`)
	}

	/**
	 * 序列化用户数据
	 */
	marshallCustomData() {
		try {
			const data = {
				type: this.type,
				payload: this.payload
			}
			return JSON.stringify(data)
		} catch (e) {
			throw new Error(`invalid custom message type: ${this.type}, payload: ${this.payload}`)
		}
	}
}