// 这里的 state 指向的是 store.MAIN.ARTICLE
let ARTICLE = (state, action) => {
  switch (action.type) {
    case 'ARTICLE_TEST': {
      return Object.assign({}, state, {
      })
    }
    
    default:
      return state
  }
}

export default ARTICLE
