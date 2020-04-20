import ActionTypes from '../action-types'
import initState from '../state'

export default function (live = initState.live, action) {
	switch (action.type) {
		case ActionTypes.Live.Update: {
			return live
		}
		default: {
			return live
		}
	}
}