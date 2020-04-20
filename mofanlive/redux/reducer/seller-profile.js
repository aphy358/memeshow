import _ from 'lodash'
import ActionTypes from '../action-types'
import initState from '../state'

export default function (sellerProfile = initState.sellerProfile, action) {
  switch (action.type) {
    case ActionTypes.SellerProfile.Update: {
      return _.assign(_.cloneDeep(sellerProfile), action.payload)
    }
    case ActionTypes.SellerProfile.UpdateEmployee: {
      return _.assign(_.cloneDeep(sellerProfile), { employee: action.payload })
    }
    default: {
      return sellerProfile
    }
  }
}