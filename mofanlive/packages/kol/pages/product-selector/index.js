import event from "@/constants/global-events"
import _ from "lodash"
import { connectPage } from "wx-redux"
import mockData from "./mock-data"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    selected: [],

    list: [],
    pageNo: 1,

    tabs: {
      list: [
        {
          name: "播过的商品",
          id: "live",
        },
        {
          name: "我的店铺",
          id: "shop",
        }
      ],
      current: "live",
    }
  },
  onLoad(options) {
    const { productIds } = options
    if (!!productIds) {
      this.data.selected = _.split(productIds, '|')
    }
  },

  onReady() {
    this.updateList()
    this.setData({ selected: this.data.selected })
  },

  updateList() {
    this.setData({
      list: null
    }, () => {
      setTimeout(() => {
        this.setData({
          list: mockData.list
        })
      }, 300)
    })
  },

  onTabsChange({ detail: { key } }) {
    this.setData({ "tabs.current": key })
    this.updateList()
  },

  onSelectProduct({ detail: { selected } }) {
    this.setData({ selected })
  },

  submit() {
    const { list, selected } = this.data
    wx.X.events.emit(event.kol.selectProducts, {
      products: _.filter(list, it => _.includes(selected, it.id))
    })
    wx.navigateBack({ delta: 1 })
  },

  options: {
    addGlobalClass: true
  }
}))