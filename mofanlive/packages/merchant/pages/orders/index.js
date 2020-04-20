import common from "../../utils"
import { connectComponent } from "wx-redux"
import _ from "lodash"
import { OrderTabs } from "@/constants/merchant-order"

const Api = wx.X.Api

const mapStateToProps = state => ({ userProfile: state.userProfile })
const mapDispatchToProps = dispatch => ({})

Component(
  connectComponent(
    mapStateToProps,
    mapDispatchToProps
  )({
    data: {
      OrderTabs,

      currentType: OrderTabs.All.Key,

      types: OrderTabs,

      orders: {
        cursor: 0,
        hasMore: true,
        content: []
      },

      isLoading: false,
    },

    lifetimes: {
      attached() {
      },
      detached() {
      }
    },

    methods: {
      /**
       * 查询订单列表
       */
      async fetchOrderList({ type, cursor }) {
        const { orders: { content } } = this.data

        this.setData({ isLoading: true })
        let res = await Api.MerchantOrder.list(!!cursor ? { type, cursor } : { type })
        this.setData({ isLoading: false })

        console.log("fetchOrderList", res.content)

        if (!!res.content) {
          res.content = _.concat(content, res.content)
          this.setData({ orders: res })
        }
      },

      /**
       * 更新订单
       */
      onRefreshOrder() {
        // 将页面滚动到顶部
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })

        // 先清空当前显示的订单
        this.setData({
          orders: {
            cursor: 0,
            hasMore: true,
            content: []
          }
        })
        this.fetchOrderList({ type: this.data.currentType })
      },

      /**
       * 切换订单类型
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
            orders: {
              cursor: 0,
              hasMore: true,
              content: []
            },
            currentType: key
          })
          this.fetchOrderList({ type: key })
        }
      },

      onOrderStatusChange({ detail }) {
        const { order } = detail
        let { content } = this.data.orders
        let thatOrder = content.find(n => n.id === order.id)
        Object.assign(thatOrder, order)
        this.setData({
          "orders.content": content
        })
      },

      onLoad({ type }) {
        if (!!type) {
          this.setData({
            currentType: type,
          })

          this.fetchOrderList({ type })
        }
      },

      onShow() {
        const { orders: { content } } = this.data
        if (content.length > 0) {
          this.onRefreshOrder()
        }
      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function() {
        const {
          currentType,
          orders: { content, hasMore, cursor }
        } = this.data

        if (hasMore) {
          this.fetchOrderList({ type: currentType, cursor })
        }
      }
    },

    options: {
      addGlobalClass: true
    }
  })
)
