/**
 * IM业务回调接口
 */
export default class IMDelegator {

	/**
	 * 获取登录凭证
	 * 
	 * @return {Object}		登录凭证
	 */
	async loginCredentials() {
		throw new Error('not implemented!')
	}

	/**
	 * 创建用户自定义消息
	 * 
	 * @param {*} type 
	 * @param {*} payload 
	 */
	createCustomMessage(type, payload) {
		throw new Error('not implemented!')
	}
}