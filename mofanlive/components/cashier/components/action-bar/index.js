import { safeArea } from 'ui-kit/behaviors/safeArea'

/**
 * @event confirm
 */
Component({
  properties: {
    total: {
      type: Number,
      value: 0
    },

    quantity: {
      type: Number,
      value: 0
    },

    checked: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    emitConfirm() {
      this.triggerEvent("confirm")
    },
    checkAll() {
      this.triggerEvent("check")
    }
  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true
  }
})