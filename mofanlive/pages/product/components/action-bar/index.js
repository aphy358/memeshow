import { safeArea } from "ui-kit/behaviors/index"

Component({
  methods: {
    handleAddToCart(e) {
      this.triggerEvent("cart")
    },
    handleBuy(e) {
      this.triggerEvent("buy")
    }
  },

  behaviors: [safeArea()],

  options: {
    addGlobalClass: true,
  }
})