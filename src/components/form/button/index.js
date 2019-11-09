/**
 * Button Component
 *
 * @todo 完全实现微信小程序 button 支持的拓展
 *
 * @slot
 * @event Buton#click
 */

Component({
  properties: {
    /**
     * button 的类型
     * `primary`, `secondary`, `
     */

    type: {
      type: String,
      value: "primary"
    },

    /**
     * button 的大小
     * `mini`, `large`
     */

    size: {
      type: String,
      value: "large"
    },

    /**
     * Button 支持 `form` 的默认操作
     * `submit`, `reset`
     */
    formType: {
      type: String,
      value: ""
    },

    disabled: {
      type: Boolean,
      value: false
    },

    // 是否展示 loading 状态
    loading: {
      type: Boolean,
      value: false
    },

    // 是否圆角
    circle: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onClick() {
      this.triggerEvent("click")
    }
  }
})
