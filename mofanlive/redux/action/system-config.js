import ActionTypes from '../action-types'

export default {

	update(test) {
		return {
			type: ActionTypes.SystemConfig.Update,
			payload: test
		}
	}

}