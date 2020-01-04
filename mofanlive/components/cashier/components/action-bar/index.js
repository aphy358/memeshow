import { safeArea } from 'ui-kit/behaviors/safeArea'

/**
 * @event confirm
 */
Component({
  properties: {
    total: {
      type: Number,
      value: 0
    }
  },

  methods: {
    emitConfirm() {
      this.triggerEvent("confirm")
    }
  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true
  }
})