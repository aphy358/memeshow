import _ from 'lodash'
import ActionTypes from "../action-types"
import initState from "../state"

export default function (userProfile = initState.userProfile, action) {
  switch (action.type) {
    case ActionTypes.UserProfile.Update: {
      return _.assign(_.cloneDeep(userProfile), action.payload)
    }
    default: {
      return userProfile
    }
  }
}
