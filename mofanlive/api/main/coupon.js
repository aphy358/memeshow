import BaseApi from 'api'

/**
 * 优惠券
 */
export default class CouponApi extends BaseApi {

	/**
	 * 领取优惠券
	 * 
	 * @param {Number} templateId
	 */
	async take(templateId) {
		return await this.post('/coupon/take', { templateId })
	}
	
}
