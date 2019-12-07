/**
 * Promo Card Component
 *
 * @todo timer 同步服务器时间
 */

Component({
  properties: {
    title: String,

    image: String,

    /**
     * 使用时间戳初始化一个计时器
     * 时间戳的单位为 `ms`
     * 优先级高于 `desc`
     */

    timer: {
      type: String,
      value: ""
    },

    // 优先级低于 `timer`
    desc: {
      type: String,
      value: ""
    }
  },

  externalClasses: ["mf-class"]
})
