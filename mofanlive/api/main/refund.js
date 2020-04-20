import BaseApi from 'api'

/**
 * 退款
 */
export default class RefundApi extends BaseApi {

	/**
	 * 退款单详情
	 * 
	 * @param {String} id - 退款单id
	 */
	async retrieve(id) {
		return await this.get(`/refund`, { id })
	}

	/**
	 * 创建退款单
	 * 
	 * @param {Object} params 
	 * {
	 *		"orderId": "string",
	 *		"type": 1,							// 退款类型, 1 => 退款退货，2 => 仅退款
	 *    "itemState": 1,					// 货物状态, 1 =>未收到货，2 => 收到货
	 *		"reason": "string",
	 *		"remark": "string",
   *		"tel": "string",
	 *		"items": [
	 *			{
	 *				"orderItemId": 0,
	 *				"amount": 0
	 *			}
	 *		],
	 *		"enclosures": [
	 *			"string"
	 *		]
	 *	}
	 */
	async create(params) {
		return await this.post(`/refund`, params)
	}

	/**
	 * 取消退款单
	 * 
	 * @param {String} refundId - 退款单号
	 */
	async cancel({ refundId }) {
		return await this.post(`/refund/cancel`, { refundId })
	}
	
	/**
	 * 重新提交退款单
	 * 
	 * @param {Object} params 
	 * {
	 *		"id": "string",
	 *		"reason": "string",
	 *		"remark": "string",
	 *		"amount": 0,
	 *		"itemState": 1,						// 货物状态, 1 =>未收到货，2 => 收到货
	 *		"tel": "string",
	 *		"enclosures": [
	 *			"string"
	 *		]
	 *	}
	 */
	async reapply(params) {
		return await this.post(`/refund/reapply`, params)
	}

	/**
	 * 登记退货物流单
	 * 
	 * @param {Object} params 
	 * {
	 *    "refundId": "string",
	 *    "dist": {
	 *      "deliveryId": "string",
	 *      "express": "string",
	 *      "expressNo": "string"
	 *      "remark": "string",
	 *			"enclosures": [
	 *				"string"
	 *			]
	 *    }
	 * }
	 */
	async checkinDelivery(params) {
		return await this.post(`/refund/deliver`, params)
	}

	/**
	 * 退款单列表
	 * 
	 * @param {Number} cursor - 当前页最后一个退款单创建时间戳
	 * @param {String} type - 类型 - [all:所有, dealing:处理中]
	 */
	async list(params) {
		return await this.get(`/refunds`, params)
	}

	/**
	 * 退款单协商记录
	 * 
	 * @param {String} id 
	 */
	async audits(id) {
		return await this.get(`/refund/audits`, { id })
	}

	/**
	 * 申请客服介入
	 * 
	 * @param {Object} params 
	 * {
	 *		"id": "string",
	 *		"reason": "string",
	 *		"enclosures": [
	 *			"string"
	 *		]
	 * }
	 */
	async adminInvolve(params) {
		return await this.post(`/refund/adminInvolve`, params)
	}

	/**
	 * 添加协商备注留言
	 * 
	 * {
	 *		"refundId": "string",
	 *		"remark": "string",
	 *		"enclosures": [
	 *			"string"
	 *		]
	 * }
	 */
	async remarkAudit(params) {
		return await this.post(`/refund/remarkAudit`, params)
	}

}
