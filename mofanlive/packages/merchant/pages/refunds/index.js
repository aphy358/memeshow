import { connectPage } from "wx-redux"
import _ from "lodash"
import { RefundTabs } from "@/constants/merchant-refund"
const Api = wx.X.Api

const mapStateToProps = state => ({ userProfile: state.userProfile })
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    RefundTabs,

    currentType: RefundTabs.All.Key,
    
    refunds: {
      cursor: 0,
      hasMore: true,
      content: []
    },

    isLoading: false,
  },

  onLoad: function ({ type }) {
    type = type || RefundTabs.All.Key
    this.setData({
      currentType: type
    })

    this.fetchRefundList({ type })
  },

  onReady: function () {
  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {
    const {
      currentType,
      refunds: { content, hasMore, cursor }
    } = this.data

    if (hasMore) {
      this.fetchRefundList({ type: currentType, cursor })
    }
  },

  /**
   * 切换售后单类型
   */
  onTabChange({ detail }) {
    const { key } = detail
    const { currentType } = this.data

    if (key !== currentType) {
      // 将页面滚动到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })

      // 先清空当前显示的订单
      this.setData({
        refunds: {
          cursor: 0,
          hasMore: true,
          content: []
        },
        currentType: key
      })
      this.fetchRefundList({ type: key })
    }
  },

  /**
   * 查询售后单列表
   */
  async fetchRefundList({ type, cursor }) {
    const {
      refunds: { content }
    } = this.data

    this.setData({ isLoading: true })
    let res = await Api.MerchantRefund.list(!!cursor ? { cursor, type } : { type })
    this.setData({ isLoading: false })

    console.log("fetchRefundList", res.content)

    if (!!res.content) {
      res.content = _.concat(content, res.content)
      this.setData({ refunds: res })
    }
  },
 
}))