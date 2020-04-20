import { safeArea } from "ui-kit/behaviors"

Component({
  properties: {
    neigou: {
      type: Number,
      value: 0,
    },
    price: {
      type: Number,
      value: 0,
    }
  },

  methods: {
    handleBuyByDefault(e) {
      this.triggerEvent("buy", {
        type: 0
      })
    },

    handleBuyByVoucher(e) {
      this.triggerEvent("buy", {
        type: 1
      })
    }
  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true,
  }
})
