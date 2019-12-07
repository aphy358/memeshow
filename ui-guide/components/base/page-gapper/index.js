/* page-gapper Component */
// 页面分隔条

Component({
  properties: {
    background: {
      type: String,
      value: "#ececec"
    },

    height: {
      type: String,
      value: "20rpx"
    },

    // `both`、`top`、`bottom`、`none`
    border: {
      type: String,
      value: "both"
    },
  },

  externalClasses: ["mf-class"]
})