/**
 * Switch Component
 *
 * @todo dynamic primary color
 *
 * @event Switch#change
 */

Component({
  properties: {
    // 是否默认开启
    on: {
      type: Boolean,
      value: false
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onChange() {
      const state = this.data.on
      this.triggerEvent("change", {
        value: !state
      })
      this.setData({ on: !state })
    }
  }
})
