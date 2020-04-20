import BaseApi from 'api'

/**
 * 退款
 */
export default class MerchantRefundApi extends BaseApi {

	/**
	 * 退款单列表
	 * 
	 * @param {Number} cursor - 当前页最后一个退款单创建时间戳
	 * @param {String} type - 类型 - [all:所有, dealing:处理中]
	 */
	async list(params) {
		return await this.get(`/merchant/refunds`, params)
	}

	/**
	 * 退款单协商记录
	 * 
	 * @param {String} id - 退款单号
	 */
	async audits(id) {
		return await this.get(`/merchant/refund/audits`, { id })
	}

	/**
	 * 退款单详情
	 * 
	 * @param {String} id - 退款单id
	 */
	async retrieve(id) {
		return await this.get(`/merchant/refund`, { id })
	}

	/**
	 * 售后单审核拒绝
	 * 
	 * @param {String} refundId - 售后单编号
	 * @param {String} reason - 拒绝原因
	 */
	async reject({ refundId, reason }) {
		return await this.post(`/merchant/refund/reject`, { refundId, reason })
	}

	/**
	 * 售后审核同意
	 * 
	 * @param {String} refundId - 售后单编号
	 */
	async confirm(refundId) {
		return await this.post(`/merchant/refund/confirm`, { refundId })
	}

	/**
	 * 售后单确认签收
	 * 
	 * @param {String} refundId - 售后单编号
	 */
	async confirmReturn(refundId) {
		return await this.post(`/merchant/refund/confirmReturn`, { refundId })
	}

	/**
	 * 售后单拒绝签收
	 * 
	 * @param {String} refundId - 售后单编号
	 * @param {String} reason - 拒绝原因
	 */
	async rejectReturn({ refundId, reason }) {
		return await this.post(`/merchant/refund/rejectReturn`, { refundId, reason })
	}

	/**
	 * 卖家同意赔付
	 * 
	 * @param {String} refundId - 售后单编号
	 */
	async agree(refundId) {
		return await this.post(`/merchant/refund/agree`, { refundId })
	}
}
