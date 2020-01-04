Component({
  properties: {
    coupon: {
      type: Object,
      value: {}
    }
  },

  methods: {
    emitClick() {
      this.triggerEvent("click", {
        id: this.data.coupon.id
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})