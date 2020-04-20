
import ActionTypes from '../action-types'

export default {

	/**
	 * 更新订单详情
	 * 
	 * @param {Object} order 
	 */
	updateOrder(order) {
		return {
			type: ActionTypes.MyCenterOrders.UpdateOrder,
			payload: order
		}
	}

}