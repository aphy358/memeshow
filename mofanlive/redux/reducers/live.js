let LIVE = (state, action) => {
  switch (action.type) {
    // 打开直播页商品列表
    case "LIVE_OPEN_PRODUCT_LIST": {
      return Object.assign({}, state, {
        productListVisibility: true
      })
    }

    // 关闭直播页商品列表
    case "LIVE_CLOSE_PRODUCT_LIST": {
      return Object.assign({}, state, {
        productListVisibility: false
      })
    }

    // 更新商品列表
    case "LIVE_REDUCE_PRODUCT_LIST": {
      return Object.assign({}, state, {
        productList: action.payload.products
      })
    }

    // 切换评论输入框的显示与隐藏
    case "LIVE_SWITCH_COMMENT_INPUT_POPUP": {
      return Object.assign({}, state, {
        showCommentInputPopup: action.payload
      })
    }

    default: {
      return state
    }
  }
}

export default LIVE