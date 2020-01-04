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
	
}