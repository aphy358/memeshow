const Api = wx.X.Api
const procedures = wx.X.procedures

/**
 * procedure: select product
 *
 * emit: { event: complete, payload: address }
 */

Page({
  data: {
    sid: "",
    products: [],
    cursor: "",

    // 已经选择的商品
    checked: []
  },

  onLoad(options) {
    this.data.sid = options.sid
    this.fetchProducts()
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)

    // 初始化 checked
    instance.asProcedure().on("init", list => {
      if (list && list.length) {
        const products = this._checkedValidator(list, this.data.products)
        this.setData({ checked: list, products })
      }
    })
    this.data.procedures = instance
  },

  onSelect({ mark }) {
    const index = mark.index
    if (typeof index === "undefined") return

    const { products, checked } = this.data
    const target = products[Number(index)]

    if (!target.ischecked) {
      // 选中
      target.ischecked = true
      const { ischecked, ...product } = target
      checked.push(product)
    } else {
      //  取消选中
      target.ischecked = false
      const dirty = checked.findIndex(product => product.id == target.id)
      if (dirty >= 0) checked.splice(dirty, 1)
    }

    this.setData({ products, checked })
  },

  onConfirm() {
    const { checked, procedures } = this.data
    if (!checked.length) return
    procedures.asProcedure().emit("confirm", checked)
    wx.navigateBack({ delta: 1 })
  },

  _checkedValidator(list, products) {
    if (list && list.length) {
      list.forEach(item => {
        const index = products.findIndex(product => product.id == item.id)
        if (index >= 0) products[index].ischecked = true
      })
    }

    return products
  },

  async fetchProducts() {
    let products = await Api.MerchantProduct.list({
      listing: true,
      lastProductId: this.data.cursor
    })
    products = this._checkedValidator(this.data.checked, products)

    this.data.products = this.data.products.concat(products)
    if (products.length >= 0) {
      this.setData({
        cursor: products[products.length - 1].id,
        products: this.data.products
      })
    }
  }
})
