import initState from "../state"
import ActionTypes from "../action-types"

export default function(neigou = initState.neigou, action) {
  switch (action.type) {

    case ActionTypes.Neigou.update:
      return {
        ...neigou,
        ...action.payload,
      }

    case ActionTypes.Neigou.add:
      return Object.assign({}, neigou, {
        count: neigou.count + action.payload.count
      })

    case ActionTypes.Neigou.consume:
      let count = neigou.count - action.payload
      return Object.assign({}, neigou, { count: count <= 0 ? 0 : count })

    default:
      return neigou
  }
}
