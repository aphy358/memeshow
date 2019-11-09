/**
 * Input Component
 *
 * @todo validator - default & customize
 *
 * @event Input#blur
 * @event Input#focus
 * @event Input#change
 * @event Input#confirm
 */

Component({
  properties: {
    value: {
      type: String,
      value: "",
      optionalTypes: [String, Number]
    },

    name: {
      type: String,
      value: ""
    },

    /**
     * One of
     * `text`, `number`, `password`, `idcard`, `digit`
     */

    type: {
      type: String,
      value: "text"
    },

    disabled: {
      type: Boolean,
      value: false
    },

    maxlength: {
      type: Number,
      value: 140
    },

    title: {
      type: String,
      value: ""
    },

    // 错误状态
    error: {
      type: Boolean,
      value: false
    },

    // 是否可全部擦除
    clear: {
      type: Boolean,
      value: false
    },

    placeholder: {
      type: String,
      value: ""
    },

    // 指定 placeholder 的样式
    placeholderStyle: {
      type: String,
      value: ""
    },

    // 键盘确认文字
    confirmType: {
      type: String,
      value: "完成"
    },

    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onChange({ detail }) {
      const value = detail.value || ""
      this.triggerEvent("change", { value })
      this.updateValue(value)
    },

    // todo clearable 应该由 input 触发，但是需要一定的优化
    onInput({ detail }) {},

    onConfirm({ detail }) {
      const value = detail.value || ""
      this.triggerEvent("confirm", { value })
      this.updateValue(value)
    },

    onFocus() {
      this.triggerEvent("focus")
    },

    onBlur() {
      this.triggerEvent("blur")
    },

    onClear() {
      this.updateValue()
    },

    updateValue(value = "") {
      this.setData({ value })
    }
  }
})
