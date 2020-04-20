import { connectComponent } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  refundDetail: state.audits.refundDetail,
})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
  },

  data: {
    contactSellerPopupVisible: false,

    shopInfo: null,
  },

  watch: {
    refundDetail(newVal, oldVal) {
      if (newVal && newVal.shop) {
        this.fetchShopInfo()
      }
    },
  },

  methods: {
    navToLeaveMessage() {
      const { refundDetail } = this.data
      router.go("leaveMessage", { id: refundDetail.id })
    },

    onHideContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: false })
    },

    showContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: true })
    },

    async fetchShopInfo() {
      const { refundDetail: { shop } } = this.data
      const shopInfo = await Api.Shop.retrieve(shop.id)
      console.log('shopInfo', shopInfo);

      this.setData({ shopInfo })
    }
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))