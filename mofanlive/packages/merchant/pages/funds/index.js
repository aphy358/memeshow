import "../../utils/index"

const Api = wx.X.Api

Page({
  data: {
    fund: {
      balance: 3800000,
      withdrawable: 0,
      withdrawal: 0,
      unsettled: 0,
      settled: 0,
      deposit: 0
    }
  },

  onLoad(options) {
    // this.fetchFund()
  },

  // 获取资金信息
  async fetchFund() {
    const fund = await Api.MerchantFunds.profile()
    this.setData({ fund })
  }
})
