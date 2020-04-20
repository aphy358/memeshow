import BaseApi from 'api'

/**
 * 店铺
 */
export default class ShopApi extends BaseApi {

	/**
	 * 店铺详情
	 *
	 * @param {String} id
	 */
	async retrieve(id) {
		return await this.get('/shop', { id })
	}

	async voucherHistory(cursor = 0) {
		return await this.get('/internalBuy/couponHistories', { cursor })
	}

}
