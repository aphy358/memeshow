import BaseApi from 'api'

export default class ShareApi extends BaseApi {

	/**
	 * 获取用户访问小程序的上下文
	 */
	async context() {
		return await this.get('/context')
	}

  /**
   * 设置分享信息 session
   * 
   * @param {string} shopId - 分享进入的店铺 ID
   * @param {string} referrerId - 分享人，即分享关系的上一级用户ID
   */
  async setReferrer({ shopId, referrerId }) {
    return await this.post('/referrer', { shopId, referrerId })
	}
	
	/**
	 * 获取用户的分享关系链
	 */
	async relations() {
		return await this.get('/relations')
	}
}
