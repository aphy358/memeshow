import common from "../../utils"
import { connectPage } from "wx-redux"
import computedBehavior from "miniprogram-computed"
import { OAK } from "@/constants/order"
const Api = wx.X.Api

const mapStateToProps = state => ({ userProfile: state.userProfile })
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    OAK,

    // 订单 id
    orderId: "",

    // 订单详情
    orderDetail: null
  },

  watch: {
    // 只有当用户已经登录了才查询订单详情
    userProfile(newVal, oldVal) {
      this.queryOrderDetail()
    },
  },

  onLoad({ id }) {
    if (!!id) {
      this.setData({ orderId: id })
      this.queryOrderDetail()
    }
  },

  onShow() {
    const { orderDetail } = this.data
    // 说明这时候很可能是从创建了售后单之后回退到当前页面的，这时候需要重新查询订单信息
    if (orderDetail && orderDetail.id) {
      this.queryOrderDetail()
    }
  },

  onReady() {
  },

  /**
   * 刷新订单
   */
  onRefreshOrder({ detail }) {
    this.queryOrderDetail()
  },

  /**
   * 查询订单详情
   */
  async queryOrderDetail() {
    const { orderId, userProfile } = this.data

    if (orderId && userProfile && userProfile.id) {
      const orderDetail = await Api.Order.retrieve(orderId)
      console.log('orderDetail', orderDetail);
  
      this.setData({ orderDetail })
    }
  }
}))
