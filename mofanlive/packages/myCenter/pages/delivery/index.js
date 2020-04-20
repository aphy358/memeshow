import { connectPage } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
const Api = wx.X.Api

const ExpressState = {
  "0": "待收货",  // 无记录
  "1": "待收货",  // 未运输
  "2": "待收货",  // 在途中
  "3": "已签收",  // 已签收
  "4": "待收货",  // 问题件
}

const mapStateToProps = state => ({ 
  order: state.myCenterOrders.thatOrder,
})
const mapDispatchToProps = dispatch => ({})


Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    currentTab: 1,

    currentExpress: {},

    deliveryTabs: [],

    ExpressState,

    isLoading: false,
  },

  watch: {
    order(newVal, oldVal) {
      if (newVal && newVal.id) {
        let deliveryIds = []
        if (newVal.deliveryOrders) {
          deliveryIds = newVal.deliveryOrders.filter(n => !!n.dist).map(n => n.deliveryId)
        } else {
          deliveryIds = newVal.deliveries || []
        }

        let deliveryTabs = deliveryIds.map((n, i) => {
          return { key: ++i, value: n }
        })

        this.setData({ deliveryTabs })

        this.fetchTrace(deliveryIds[0])
      }
    },
  },

  /**
   * 查询物流详情
   */
  async fetchTrace(deliveryId) {
    if (deliveryId) {
      this.setData({ isLoading: true })
      let currentExpress = await Api.Order.trace(deliveryId)
      console.log('fetchTrace res', currentExpress);
      currentExpress.traces = currentExpress.traces.sort((a, b) => b.timestamp - a.timestamp)
      this.setData({ currentExpress, isLoading: false })
    }
  },

  onLoad(options) {
    this.data.id = options.id
  },

  onReady() {
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

  },

  /**
   * 切换订单类型
   */
  onTabChange({ detail }) {
    const { key } = detail
    const { currentTab, deliveryTabs } = this.data

    if (key !== currentTab) {
      // 将页面滚动到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })

      this.setData({ currentExpress: null })

      for (let i = 0; i < deliveryTabs.length; i++) {
        if (key === deliveryTabs[i].key) {
          this.fetchTrace(deliveryTabs[i].value)
          this.setData({ currentTab: key })
        }
      }
    }
  },
 
}))