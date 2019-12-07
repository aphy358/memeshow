import _ from 'lodash'

// 这里的 state 指向的是 store.MAIN.VIDEO
let VIDEO = (state, action) => {
  switch (action.type) {
    // 设置 video 数据数组
    case 'SET_VIDEO_ITEMS': {
      return Object.assign({}, state, {
        videoItems: action.payload
      })
    }

    // 更新某个 video 数据项
    case 'UPDATE_VIDEO_ITEM': {
      let stateCopy = _.cloneDeep(state)
      const index = stateCopy.videoItems.findIndex(n => n.id === action.payload.id)
      stateCopy.videoItems.splice(index, 1, action.payload)
      
      return stateCopy
    }
    
    default:
      return state
  }
}

export default VIDEO
