import ActionTypes from '../action-types'
import initState from '../state'

export default function (audits = initState.audits, action) {
	switch (action.type) {
		case ActionTypes.Audits.UpdateRefund: {
			audits.refundDetail = action.payload
			return audits
		}
		default: {
			return audits
		}
	}
}