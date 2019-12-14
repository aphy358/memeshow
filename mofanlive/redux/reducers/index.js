import INITIAL_STATE from '../store/index.js'
import COMMON from './common'
import LIVE from './live'


let indexReducer = (state = INITIAL_STATE, action) => {
  return {
    // 公共 reducers 集合
    COMMON: COMMON(state.COMMON, action),
    LIVE: LIVE(state.LIVE, action),
  }
}

export default indexReducer
