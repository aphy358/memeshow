Component({
  properties: {
    total: {
      type: Number,
      value: 0
    },

    all: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    emitCheckAll(e) {
      this.triggerEvent('check', e.detail)
    },
    emitSubmit() {
      this.triggerEvent('submit')
    }
  },

  options: {
    addGlobalClass: true
  }
})