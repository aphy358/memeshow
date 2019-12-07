/**
 * Mask component
 *
 * @event Mask#click
 */

Component({
  properties: {
    show: Boolean,

    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onTap() {
      this._emitClick()
    },

    // prevent default touchmove event
    onTouchMove() {},

    _emitClick() {
      this.triggerEvent("click")
    }
  }
})
