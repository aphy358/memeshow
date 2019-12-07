import INITIAL_STATE from '../store/index.js'

import MAIN from './mainPackage/index'
import IM from './subPackages/IM'

let indexReducer = (state = INITIAL_STATE, action) => {
  return {
    // 主包 reducers 集合
    MAIN: MAIN(state.MAIN, action),

    // IM 分包 reducers 集合
    IM: IM(state.IM, action),
  }
}

export default indexReducer
