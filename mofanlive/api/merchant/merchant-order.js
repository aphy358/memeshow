import BaseApi from 'api'

/**
 * 订单
 */
export default class MerchantOrderApi extends BaseApi {

	/**
	 * 卖家订单备注
	 * 
	 * @param {String} orderId * - 订单编号
	 * @param {String} content * - 备注内容,100字以内
	 */
	async remark({ orderId, content }) {
		return await this.post(`/merchant/order/remark`, { orderId, content })
	}

	/**
	 * 修改订单价格
	 * 
	 * @param {String} id * - 订单编号
	 * @param {Number} postage * - 运费,单位分
	 * @param {Number} amount * - 最终价格必须大于0
	 */
	async adjustAmount({ id, postage, amount }) {
		return await this.post(`/merchant/order/adjustAmount`, { id, postage, amount })
	}

	/**
	 * 取消订单
	 * 
	 * @param {String} orderId * - 订单号
	 * @param {String} reason - 关闭原因
	 */
	async cancel(params) {
		return await this.post(`/merchant/order/cancel`, params)
	}

	/**
	 * 订单详情
	 * 
	 * @param {String} id * - 订单号
	 */
	async retrieve(id) {
		return await this.get(`/merchant/order`, { id })
	}

	/**
	 * 订单列表
	 * 
	 * @param {Number} cursor - 当前页最后一个创建订单的时间戳
	 * @param {String} type - [all, unpaid, undelivered, delivering]
	 */
	async list(params) {
		return await this.get(`/merchant/orders`, params)
	}

	/**
	 * 登记发货物流单
	 * 
	 * @param {Object} params 
	 * {
	 *    "orderId": "string", - 订单id
	 * 	  "items": [ - 发货的物流单包含的订单商品的ID
	 *      3534543
	 *    ],
	 *    "dist": { - 订单中的商品（无需发货时,该字段不要传）
	 *      "express": "string", - 物流公司对应的枚举，参考末尾枚举列表
	 *      "expressNo": "string" - 物流单号
	 *    }
	 * }
	 */
	async checkinDelivery(params) {
		return await this.post(`/merchant/order/deliver`, params)
	}

	/**
	 * 物流详情
	 * 
	 * @param {String} id - 订单号
	 */
	async delivery(id) {
		return await this.get(`/merchant/order/delivery`, { id })
	}

	/**
	 * 获取订单可发货的商品信息
	 * 
	 * @param {String} orderId * - 订单号
	 */
	async retrieveDeliveryItems(orderId) {
		return await this.get(`/merchant/order/retrieveDeliveryItems`, { orderId })
	}

	/**
	 * 订单数量
	 */
	async count() {
		return await this.get("/merchant/order/count")
	}
}


// 物流公司对应的枚举
// ExpressSF  = "顺丰"
// ExpressBS  = "百世"
// ExpressST  = "申通"
// ExpressZT  = "中通"
// ExpressYT  = "圆通"
// ExpressYD  = "韵达"
// ExpressYZ  = "邮政"
// ExpressEMS = "EMS"
// ExpressTT  = "天天"
// ExpressJD  = "京东"
// ExpressYS  = "优速"
// ExpressDB  = "德邦"
// ExpressZJS = "宅急送"