/**
 * Live List Component
 *
 * @slot before
 * @slot after
 */

Component({
  properties: {
    /**
     * 推荐的主播
     */

    rooms: Array,

    /**
     * 直播入口图片
     * 可以传入一张图片
     * 或者传入
     */

    entry: {
      type: String,
      value: "",
      optionalTypes: [String, Array]
    }
  },

  options: {
    multipleSlots: true
  }
})
