import ActionTypes from '../action-types'
import initState from '../state'

export default function (myCenterOrders = initState.myCenterOrders, action) {
	switch (action.type) {
		case ActionTypes.MyCenterOrders.UpdateOrder: {
			myCenterOrders.thatOrder = action.payload
			return myCenterOrders
		}
		default: {
			return myCenterOrders
		}
	}
}