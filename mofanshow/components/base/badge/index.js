/**
 * Badge Component
 */

Component({
  properties: {
    hint: {
      type: String,
      value: "",
      optionalTypes: [Number, String]
    },

    dot: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleTap() {
      this.emitWipe()
    },

    emitWipe() {
      this.triggerEvent("wipe", {})
    }
  }
})
