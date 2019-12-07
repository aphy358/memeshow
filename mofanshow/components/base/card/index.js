/**
 * Card Component
 *
 * @slot
 */

Component({
  properties: {
    title: {
      type: String,
      value: ""
    },

    note: {
      type: String,
      value: ""
    },

    thumb: {
      type: String,
      value: ""
    },

    extra: {
      type: String,
      value: ""
    },

    full: {
      type: Boolean,
      value: false
    }
  }
})
