import ActionTypes from '../action-types'

export default {

	/**
	 * 全量更新用户资料
	 * 
	 * @param {*} userProfile 
	 */
	update(userProfile) {
		return {
			type: ActionTypes.UserProfile.Update,
			payload: userProfile
		}
	}

}