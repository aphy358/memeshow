Component({
  properties: {
    products: {
      type: Object,
      value: []
    },

    open: {
      type: Boolean,
      value: false
    }
  },

  lifetimes: {
    attached() {
    }
  },

  methods: {
    handleTapProduct(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent("product", {
        id
      })
    },

    handleTapBuy(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent("buy", {
        id
      })
    },

    emitClose() {
      this.triggerEvent("close")
    }
  },

  options: {
    addGlobalClass: true
  }
})