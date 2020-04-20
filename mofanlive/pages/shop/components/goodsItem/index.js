Component({
  properties: {
    product: {
      type: Object,
      value: {}
    },
    marginBottom: {
      type: Number,
      value: 20
    },
    className: {
      type: String,
      value: ""
    }
  },

  data: {
    saleOut: false,
    isInternalBuy: false
  },

  observers: {
    "product.stock": function(value) {
      this.setData({ saleOut: !value })
    },

    // "product.internalBuy" : function(value) {
    //   if ()
    // }
  },

  methods: {
    shareToFriends() {},
    onTap() {
      this.triggerEvent("clickProduct", {
        product: this.data.product
      }, {
        bubbles: true,
        composed: true
      })
    }
  },

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  }
})
