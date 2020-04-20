
import ActionTypes from '../action-types'

export default {

	/**
	 * 更新订单详情
	 * 
	 * @param {Object} order 
	 */
	updateRefund(order) {
		return {
			type: ActionTypes.CreateRefund.UpdateOrder,
			payload: order
		}
	}

}