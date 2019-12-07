/**
 * Button Component
 *
 * @slot
 * @event Button#click
 */

Component({
  properties: {
    /**
     * button 的类型
     * `primary`, `secondary`, `tertiary`
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

    /**
     * 微信开放能力
     * 参考微信 open-type 文档
     */

    openType: {
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
    },

    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: Number,
      value: 20
    },

    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: Number,
      value: 70
    },

    // 指定是否阻止本节点的祖先节点出现点击态
    hoverStopPropagation: {
      type: Boolean,
      value: false
    },

    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
    lang: {
      type: String,
      value: "en"
    }
  },

  methods: {
    onClick() {
      if (this.data.disabled) return
      this.triggerEvent("click")
    }
  },

  externalClasses: ["mf-class", "mf-class__hover"]
})
