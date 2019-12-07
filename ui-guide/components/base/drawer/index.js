/**
 * Drawer Component
 *
 * @slot title
 * @slot [content]
 * @event Drawer#change
 */

Component({
  properties: {
    // 优先级高于 `slot#title`
    title: {
      type: String,
      value: ""
    },

    actived: {
      type: Boolean,
      value: false
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

  externalClasses: ["mf-class"],

  methods: {
    onSwitch() {
      this.setData({
        actived: !this.data.actived
      })
    }
  }
})
