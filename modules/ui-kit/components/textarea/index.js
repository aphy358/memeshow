/**
 * Textarea Component
 *
 * @event Textarea#focus
 * @event Textarea#blur
 * @event Textarea#lineChange
 * @event Textarea#confirm
 * @event Textarea#input
 */

Component({
  properties: {
    name: {
      type: String,
      value: ""
    },

    value: {
      type: String,
      value: ""
    },

    maxlength: {
      type: Number,
      value: 200
    },

    disabled: {
      type: Boolean,
      value: false
    },

    // 是否展示当前输入字数
    counter: {
      type: Boolean,
      value: false
    },

    placeholder: {
      type: String,
      value: "请输入文本"
    },

    placeholderStyle: {
      type: String,
      value: ""
    },

    height: {
      type: Number,
      value: 300
    },

    border: {
      type: Boolean,
      value: false
    },

    error: {
      type: Boolean,
      value: false
    },

    /**
     * 如果 textarea 是在一个 `position:fixed` 的区域
     * 需要显示指定属性 `fixed` 为 `true`
     */

    fixed: {
      type: Boolean,
      value: false
    },

    focus: {
      type: Boolean,
      value: false
    },

    autoFocus: {
      type: Boolean,
      value: false
    },

    /**
     * 是否自动增高
     * 设置 `auto-height` 时，`style.height` 不生效
     */

    autoHeight: {
      type: Boolean,
      value: false
    },

    /**
     * 指定光标与键盘的距离
     * 取 `textarea` 距离底部的距离
     * 和 `cursor-spacing` 指定的距离
     * 的最小值作为光标与键盘的距离
     */

    cursorSpacing: {
      type: Number,
      value: 0
    },

    // 指定 `focus` 时的光标位置
    cursor: {
      type: Number,
      value: -1
    },

    // 是否显示键盘上方带有”完成“按钮那一栏
    showConfirmBar: {
      type: Boolean,
      value: true
    },

    /**
     * 光标起始位置
     * 自动聚集时有效
     * 需与 `selectionEnd` 搭配使用
     */

    selectionStart: {
      type: Number,
      value: -1
    },

    /**
     * 光标结束位置
     * 自动聚集时有效
     * 需与 `selectionStart` 搭配使用
     */

    selectionEnd: {
      type: Number,
      value: -1
    },

    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      value: true
    },

    // focus 时，点击页面的时候不收起键盘
    holdKeyboard: {
      type: Boolean,
      value: false
    }
  },

  data: {
    length: 0
  },

  methods: {
    onFocus({ detail }) {
      this.triggerEvent("focus", detail)
    },

    onBlur({ detail }) {
      this.triggerEvent("blur", detail)
    },

    onLineChange({ detail }) {
      this.triggerEvent("lineChange", detail)
    },

    onInput({ detail }) {
      this.updateLength(detail.value)
      this.triggerEvent("input", detail)
    },

    onConfirm({ detail }) {
      this.triggerEvent("confirm", detail)
    },

    updateLength(value = "") {
      this.setData({ length: value.trim().length })
    }
  },

  observers: {
    value(val) {
      if (val.length > 0)
        this.setData({ length: val.length })
    }
  }
})
