import { connectPage } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
import { RSK } from '@/constants/merchant-refund'
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({
  userProfile: state.userProfile
})
const mapDispatchToProps = dispatch => ({
})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    RSK,

    refundDetail: {},
  },

  watch: {
    // 只有当用户已经登录了才查询订单详情
    async userProfile(newVal, oldVal) {
      if (newVal && newVal.id) {
        this.queryRefundDetail()
      }
    },
  },

  onLoad({ id }) {
    if (!!id) {
      this.setData({ refundId: id })
      this.queryRefundDetail()
    }
  },

  onReady() {
    this.setData({
      actions: [
        {
          key: 'cancel',
          title: '撤销申请',
        }
      ]
    })
  },

  onShow() {
    const { refundDetail } = this.data
    // 说明这时候很可能是从提交了客服介入申请之后回退到当前页面的，这时候需要重新查询售后单信息
    if (refundDetail && refundDetail.id) {
      this.queryRefundDetail()
    }
  },

  /**
   * 查询售后单详情
   */
  async queryRefundDetail() {
    const { userProfile, refundId } = this.data

    if (refundId && userProfile && userProfile.id) {
      const refundDetail = await Api.MerchantRefund.retrieve(refundId)
      console.log('refundDetail', refundDetail);
      this.setData({ refundDetail })
    }
  },

  /**
   * 点击底部操作
   */
  onRefreshRefund({ detail }) {
    this.queryRefundDetail()
  },

  /**
   * 跳转到协商页面
   */
  navToRecords() {
    console.log('records')
    router.go("refundRecord")
  },
}))