import ActionTypes from '../action-types'
import initState from '../state'

export default function (systemConfig = initState.systemConfig, action) {
	switch (action.type) {
		case ActionTypes.SystemConfig.Update: {
			return systemConfig
		}
		default: {
			return systemConfig
		}
	}
}