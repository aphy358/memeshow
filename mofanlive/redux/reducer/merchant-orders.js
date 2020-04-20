import ActionTypes from '../action-types'
import initState from '../state'

export default function (merchantOrders = initState.merchantOrders, action) {
	switch (action.type) {
		case ActionTypes.MerchantOrders.UpdateOrder: {
			merchantOrders.thatOrder = action.payload
			return merchantOrders
		}
		default: {
			return merchantOrders
		}
	}
}