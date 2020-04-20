import _ from 'lodash'
import ActionTypes from '../action-types'
import initState from '../state'

export default function (referrer = initState.referrer, action) {
  switch (action.type) {
    case ActionTypes.Referrer.Update: {
      return _.assign(_.cloneDeep(referrer), action.payload)
    }
    default: {
      return referrer
    }
  }
}