Component({
  properties: {
    sort: {
      type: Number,
      value: 0,
    },

    product: {
      type: Object,
      value: null
    }
  },
  methods: {
    handleTapBuy() {
      const id = this.data.product.id
      this.triggerEvent("buy", {
        id
      }, {
        bubbles: true,
        composed: true,
      })
    },
  },
  options: {
    addGlobalClass: true
  }
})