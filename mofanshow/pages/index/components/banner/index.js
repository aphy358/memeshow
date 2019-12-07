/**
 * Banner Component
 * 原生 swiper
 */

Component({
  properties: {
    /**
     * @property {string|number} id
     * @property {string} url
     * @property {string} image
     */

    list: Array,

    current: {
      type: Number,
      value: 0
    },

    autoplay: {
      type: Boolean,
      value: false
    },

    // 自动切换时间间隔，单位 `ms`
    interval: {
      type: Number,
      value: 5000
    },

    // 滑动动画时长
    duration: {
      type: Number,
      value: 500
    },

    // 是否采用衔接滑动
    circular: {
      type: Boolean,
      value: false
    },

    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      value: false
    },

    // 指示点颜色
    indicatorColor: {
      type: String,
      value: "rgba(0, 0, 0, .3)"
    },

    // 当前选中的指示点颜色
    indicatorActiveColor: {
      type: String,
      value: "#fe2c54"
    }
  }
})
