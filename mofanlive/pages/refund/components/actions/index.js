import { safeArea } from 'ui-kit/behaviors/safeArea'
Component({
  properties: {
    actions: {
      type: Object,
      value: {}
    }
  },

  methods: {
    emitClick(e) {
      const key = e.currentTarget.dataset.key
      this.triggerEvent("click", { key })
    }
  },

  behaviors: [safeArea()],
  options: {
    addGlobalClass: true
  }
})