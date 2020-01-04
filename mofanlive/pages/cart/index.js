import cartList from '@/data/cartList'

Page({
  data: {
    trades: [],

    checkAllState: false,
  },

  // 列表组件句柄
  list: null,

  onReady() {
    this.list = this.selectComponent("#trades")

    this.init()
  },

  init() {
    this.setData({
      trades: cartList
    })
  },

  // 选中所有sku
  checkAll(e) {
    const state = e.detail.checked
    this.list.checkAll(state)
  },

  setCheckAllState(e) {
    console.log(e)
    const checkAllState = e.detail.state
    this.setData({
      checkAllState
    })
  },

  // 提交选中商品
  submit() {
    console.log('submit')
  }
})