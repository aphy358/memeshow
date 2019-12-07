/**
 * Module Containner
 *
 * 这个组件是用来统一首页之间各个模块的通用样式
 * @slot 模块
 */

Component({
  properties: {
    // 自定义的样式
    customize: {
      type: String,
      value: ""
    }
  },

  externalClasses: ["mf-class"]
})
