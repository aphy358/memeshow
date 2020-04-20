import ActionTypes from '../action-types'
import initState from '../state'

export default function (createRefund = initState.createRefund, action) {
	switch (action.type) {
		case ActionTypes.CreateRefund.UpdateOrder: {
			createRefund.order = action.payload
			return createRefund
		}
		default: {
			return createRefund
		}
	}
}