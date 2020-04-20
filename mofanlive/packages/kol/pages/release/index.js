import event from "@/constants/global-events"
import _ from "lodash"
import { connectPage } from "wx-redux"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    demand: "video",
    budget: null,
    products: [],
    bonusRate: null,
    date: null,
    sample: false,

    today: null
  },

  onLoad(options) {
  },

  onReady() {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    this.setData({
      today: `${y}-${m}-${d}`
    })
    wx.X.events.on(event.kol.selectProducts, ({ products }) => {
      console.log(products)
      this.setData({ products })
    })
  },

  /**
   * 需求类型选择
   * @param {bool} checked
   * @param {string} value
   */
  onDemandChecked({ detail: { checked, value } }) {
    this.setData({
      demand: value
    })
  },

  onBudgetInput({ detail: { value } }) {
    this.setData({ budget: value ? value : null })
  },

  onBudgetBlur({ detail: { value } }) {
    this.setData({ budget: value ? parseInt(value).toFixed(2) : null })
  },

  onBonusRateInput({ detail: { value } }) {
    this.setData({
      bonusRate: value ? value : null
    })
  },

  onBonusRateFocus() {
    let { bonusRate } = this.data
    this.setData({
      bonusRate: bonusRate ? bonusRate.split('%')[0] : null
    })
  },

  onBonusRateBlur({ detail: { value } }) {
    this.setData({
      bonusRate: value + '%'
    })
  },

  onDateChange({ detail: { value } }) {
    this.setData({ date: value })
  },

  onSampleChecked({ detail: { checked } }) {
    this.setData({ sample: checked })
  },

  onConfirm() {
    wx.X.router.go("kolTaskDetail", null, {method: "redirectTo"})
  },

  onSelectProductTap() {
    const { products } = this.data
    // TODO 若商店没有商品，则发布商品
    wx.X.router.go("kolProductSelector", {
      productIds: _.join(_.map(products, it => it.id), '|')
    })
  },

  options: {
    addGlobalClass: true
  }
}))
