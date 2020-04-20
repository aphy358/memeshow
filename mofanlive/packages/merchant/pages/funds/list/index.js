Page({
  data: {
    type: "",
    list: []
  },

  onLoad(params) {
    const type = params.type || "unsettled"
    wx.setNavigationBarTitle({
      title: typeMap[type]
    })
    this.setData({ type })
  },
})

const typeMap = {
  unsettled: "待结算收入"
}