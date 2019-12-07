/**
 * Switch Component
 *
 * @event Switch#change
 */

Component({
  properties: {
    // 是否默认开启
    checked: {
      type: Boolean,
      value: false
    },

    disabled: {
      type: Boolean,
      value: false
    },

    // 样式，有效值：switch, checkbox
    type: {
      type: String,
      value:  "switch"
    }
  },

  methods: {
    onChange() {
      const state = this.data.checked
      this.triggerEvent("change", {
        checked: !state
      })
    }
  }
})
