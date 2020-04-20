import { connectPage } from "wx-redux"
import mockData from "./mock-data"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    list: [],
  },
  onLoad(options) { },

  onReady() {
    this.setData({
      list: mockData
    })
  },

  onTaskTap({ currentTarget: { dataset: { id } } }) {
    wx.X.router.go("kolTaskDetail")
  },

  options: {
    addGlobalClass: true
  }
}))