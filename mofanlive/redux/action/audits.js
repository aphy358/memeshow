
import ActionTypes from '../action-types'

export default {

	/**
	 * 更新售后单详情
	 * 
	 * @param {Object} refund 
	 */
	updateRefund(refund) {
		return {
			type: ActionTypes.Audits.UpdateRefund,
			payload: refund
		}
	}

}