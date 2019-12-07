/**
 * Loading More Component
 */

Component({
  properties: {
    // 是否正在 loading 状态
    enloading: Boolean,

    enloadingText: {
      type: String,
      value: "正在加载"
    },

    afterloading: {
      type: Boolean,
      value: false
    },

    afterloadingText: {
      type: String,
      value: "加载完成"
    },

    nomore: {
      type: Boolean,
      value: false
    },

    nomoreText: {
      type: String,
      value: "已加载全部"
    },

    error: {
      type: Boolean,
      value: false
    },

    errorText: {
      type: String,
      value: "加载失败"
    }
  }
})
