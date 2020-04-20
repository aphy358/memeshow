import BaseApi from 'api'

/**
 * 购物结算
 */
export default class CashierApi extends BaseApi {

	/**
	 * 创建订单前结算
	 * 
	 * @param {Object} params
	 * {
	 *	  "shopId": 0,
	 *	  "remark": "string",
	 *	  "items": [
	 *	  	{
	 *	  		"skuId": "string",
	 *	  		"productId": "string",
	 *	  		"quantity": 0
	 *	  	}
	 *    ]
	 * }
	 */
	async create(params) {
		return await this.post('/cashier', params)
	}

	/**
	 * 更新结算页地址
	 * 
	 * @param {String} id 
	 */
	async updateAddress(id) {
		return await this.post('/cashier/updateAddress', { id })
	}

	/**
	 * 更新结算页优惠券
	 * 
	 * @param {Array<String>} ids
	 */
	async updateCoupon(ids) {
		return await this.post('/cashier/updateCoupon', ids)
	}

	/**
	 * 更新结算页付款方式
	 * 
	 * @param {String} payMethod（wechat）
	 */
	async updatePayMethod(payMethod = 'wechat') {
		return await this.post('/cashier/updatePayMethod', { payMethod })
	}

	/**
	 * 更新结算页备注
	 * 
	 * @param {Integer} shopId
	 * @param {String} remark
	 */
	async updateRemark({ shopId, remark }) {
		return await this.post('/cashier/updateRemark', { shopId, remark })
	}

	/**
	 * 检出结算页创建订单
	 */
	async checkout() {
		return await this.post('/cashier/checkout')
	}

	/**
	 * 更新结算页商品
	 * 
	 * {
	 * 	 items: [{
	 * 		  skuId,
	 * 		  quantity,
	 * 		  product,
	 *   }]
	 * }
	 */
	async updateItems(req) {
		return await this.post('/cashier/updateItems', req)
	}

}
