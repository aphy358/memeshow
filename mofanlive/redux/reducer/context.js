import _ from 'lodash'
import ActionTypes from '../action-types'
import initState from '../state'

export default function (context = initState.context, action) {
  switch (action.type) {
    case ActionTypes.Context.Update: {
      return _.assign(_.cloneDeep(context), action.payload)
    }
    case ActionTypes.Context.UpdateIsMerchant: {
      return _.assign(_.cloneDeep(context), { isMerchant: action.payload })
    }
    case ActionTypes.Context.UpdateShopId: {
      return _.assign(_.cloneDeep(context), { shopId: action.payload })
    }
    case ActionTypes.Context.UpdateReferrerId: {
      return _.assign(_.cloneDeep(context), { referrerId: action.payload })
    }
    default: {
      return context
    }
  }
}