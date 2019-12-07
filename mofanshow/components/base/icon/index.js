/* Icon Component */
/**@todo: 自定义路径 */

Component({
  properties: {
    name: String,

    /**
     * 字体大小
     * 单位`px`
     */

    size: {
      type: Number,
      value: 30
    },

    color: {
      type: String,
      value: ""
    }
  },

  externalClasses: ["mf-class"]
})