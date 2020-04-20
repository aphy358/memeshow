import ActionTypes from '../action-types'

export default {
  update(context) {
    return {
      type: ActionTypes.Context.Update,
      payload: context
    }
  },
  updateIsMerchant(isMerchant) {
    return {
      type: ActionTypes.Context.UpdateIsMerchant,
      payload: isMerchant
    }
  },
  updateShopId(shopId) {
    return {
      type: ActionTypes.Context.UpdateShopId,
      payload: shopId
    }
  },
  updateReferrerId(referrerId) {
    return {
      type: ActionTypes.Context.UpdateReferrerId,
      payload: referrerId
    }
  }
}