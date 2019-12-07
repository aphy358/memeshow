import COMMON from './common'
import ARTICLE from './article'
import VIDEO from './video'

// 这里的 state 指向的是 store.MAIN
let MAIN = (state, action) => {
  return {
    // 公共 reducers 集合
    COMMON: COMMON(state.COMMON, action),

    // video 页面 reducers 集合
    VIDEO: VIDEO(state.VIDEO, action),

    // article 页面 reducers 集合
    ARTICLE: ARTICLE(state.ARTICLE, action),
  }
}

export default MAIN
