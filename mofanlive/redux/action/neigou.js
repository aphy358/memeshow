import ActionTypes from "../action-types"

export default {
  update(voucherData) {
    return {
      type: ActionTypes.Neigou.update,
      payload: voucherData
    }
  },

  add(voucherData) {
    return {
      type: ActionTypes.Neigou.add,
      payload: voucherData
    }
  },

  consume(voucherData) {
    return {
      type: ActionTypes.Neigou.consume,
      payload: voucherData
    }
  }
}