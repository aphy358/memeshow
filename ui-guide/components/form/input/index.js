/**
 * Input Component
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

    // 错误提示内容
    errorText: {
      type: String,
      value: "输入错误，请确认"
    },

    // 是否可全部擦除
    clearable: {
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

  externalClasses: ["mf-class-placeholder"],

  methods: {
    onChange({ detail }) {
      const value = detail.value || ""
      this.triggerEvent("change", { value })
      this.updateValue(value)
    },

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

    onConfirmError() {
      wx.showModal({
        content: this.data.errorText,
        showCancel: false
      })
    },

    updateValue(value = "") {
      this.setData({ value })
    }
  }
})
