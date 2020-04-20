import { connectPage } from "wx-redux"
import mockData from "./mock-data"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    demand: '',
    budget: 0,
    products: [],
    bonusRate: 0,
    date: "",
    sample: null
  },
  onLoad(options) { },

  onReady() {
    this.setData({
      ...mockData
    })
  },

  onSelectProductTap() {
    wx.X.router.go("kolProducts")
  },

  options: {
    addGlobalClass: true
  }
}))