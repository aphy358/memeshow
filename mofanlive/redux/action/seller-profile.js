import ActionTypes from '../action-types'

export default {
  update(sellerProfile) {
    return {
      type: ActionTypes.SellerProfile.Update,
      payload: sellerProfile
    }
  },
  updateEmployee(employee) {
    return {
      type: ActionTypes.SellerProfile.UpdateEmployee,
      payload: employee
    }
  }
}