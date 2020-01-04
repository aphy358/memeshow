import ActionTypes from '../action-types'
import { toState } from '../state/user-profile'
import initState from '../state'

export default function (userProfile = initState.userProfile, action) {
	switch (action.type) {
		case ActionTypes.UserProfile.Update: {
			return toState(action.payload)
		}
		default: {
			return userProfile
		}
	}
}