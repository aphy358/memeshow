import _ from "lodash"
import Utils from "../../utils"
import { connectPage } from "wx-redux"
import mockData from "./mock-data"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    banner: "",
    tabs: {
      list: [{ name: '全部', id: 'all' }].concat(mockData.tabs),
      current: "all",
    },

    kol: {
      list: [],
      pageNo: 1
    },

    filterOpen: false,
    filters: mockData.filters,
  },

  onLoad(options) { },

  onReady() {
    this.updateList()
  },

  updateList() {
    const { kol } = this.data
    this.setData({
      "kol.list": _.map(new Array(20), (it, k) => ({
        ...mockData.kol,
        id: mockData.kol.id + k,
      })),
      "kol.pageNo": ++kol.pageNo
    })
  },

  onPageScroll(e) {
    console.log(e)
  },

  openFilter() {
    this.setData({
      filterOpen: true
    })
  },

  closeFilter() {
    this.setData({
      filterOpen: false
    })
  },

  onFilterChange(e) {
    const filters = e.detail
    this.closeFilter()
  },

  changeCategory({ detail: { key } }) {
    console.log(key)
    this.setData({
      "kol.list": []
    }, () => {
      setTimeout(this.updateList.bind(this), 300)
    })
  },

  options: {
    addGlobalClass: true
  }
}))