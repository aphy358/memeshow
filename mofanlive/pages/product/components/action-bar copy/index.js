import { safeArea } from "ui-kit/behaviors/index"

Component({
  data: {
    actions: [
      {
        key: 'home',
        title: '店铺',
        icon: 'home',
      },
      // {
      //   key: 'service',
      //   title: '客服',
      //   icon: 'phone',
      // },
      {
        key: 'cart',
        title: '购物车',
        icon: 'shopping-cart',
      },
    ]
  },

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