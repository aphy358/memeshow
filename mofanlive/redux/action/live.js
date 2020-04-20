import ActionTypes from '../action-types'

export default {

	update(test) {
		return {
			type: ActionTypes.Live.Update,
			payload: test
		}
	}

}