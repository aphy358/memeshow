import { connectPage } from "wx-redux"
import mockData from "../product-selector/mock-data"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    products: []
  },
  onLoad(options) { },

  onReady() {
    this.setProducts({
      products: mockData.products.concat(mockData.products)
    })
  },

  setProducts({ products }) {
    this.setData({ products })
  },

  options: {
    addGlobalClass: true
  }
}))