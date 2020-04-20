import ActionTypes from '../action-types'

export default {
  update(referrer) {
    return {
      type: ActionTypes.Referrer.Update,
      payload: referrer
    }
  }
}