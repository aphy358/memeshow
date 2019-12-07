/**
 * List Item Video Component
 */

Component({
  properties: {
    url: String,

    autoplay: {
      type: Boolean,
      value: false
    },

    muted: {
      type: Boolean,
      value: true
    },

    loop: {
      type: Boolean,
      value: false
    },

    controls: {
      type: Boolean,
      value: false
    }
  }
})
