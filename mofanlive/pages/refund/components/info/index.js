Component({
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  methods: {
    emitRecords() {
      this.triggerEvent("records")
    }
  },

  options: {
    addGlobalClass: true
  },
})