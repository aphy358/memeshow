// 这里的 state 指向的是 store.MAIN.COMMON
let COMMON = (state, action) => {
  switch (action.type) {
    // 公共的设置 state 的方法，这里的 key 和 state 里面对应的字段一致才行
    case 'COMMON_ACTION': {
      return Object.assign({}, state, {
        [action.key]: action.value
      })
    }
    
    default:
      return state
  }
}

export default COMMON
