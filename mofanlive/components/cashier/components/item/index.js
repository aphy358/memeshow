/**
 * @event change { deleted, checked, skuId, quantity }
 */
Component({
  properties: {
    sku: {
      type: Object,
      value: {}
    },
  },

  data: {
    actions: [
      {
        key: 'delete',
        title: '删除',
        bg: "#ff4949",
        color: "#ffffff"
      }
    ]
  },

  methods: {
    /**
     * 当选择商品时
     * @param {event} e 
     */
    handleCheck(e) {
      this.triggerEvent("change", {
        deleted: false,
        checked: e.detail.checked,
        skuId: this.data.sku.skuId,
        quantity: this.data.sku.quantity,
      })
    },

    /**
     * 点击商品拖拽菜单
     * @param {event} e 
     */
    handleClickMenu(e) {
      const menu = e.detail
      console.log(menu)
      switch (menu.key) {
        case "delete": this.deleteItem()
      }
    },

    /**
     * 删除该商品
     */
    async deleteItem() {
      wx.showModal({
        title: "从购物车中删除",
        confirmText: "删除",
        confirmColor: "#ff4949",
        success: (res) => {
          if (res.confirm) {
            this.triggerEvent("change", {
              deleted: true,
              skuId: this.data.sku.skuId,
            })
          }
        }
      })
    },

    changeQuantity(e) {
      this.triggerEvent("change", {
        deleted: false,
        skuId: this.data.sku.skuId,
        quantity: e.detail.value,
        checked: this.data.sku.selected,
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})