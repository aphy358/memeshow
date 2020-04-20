import { connectComponent } from "wx-redux"
import Action from "@/redux/action"
import { switchContext } from "@/utils/context"
import computedBehavior from "miniprogram-computed"

const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({
  referrer: state.referrer,
  userProfile: state.userProfile,
  sellerProfile: state.sellerProfile,
  neigou: state.neigou
})

const mapDispatchToProps = dispatch => ({
  setContext(context) {
    dispatch(Action.context.update(context))
  },
  removeUserProfile() {
    dispatch(Action.userProfile.update({}))
  },
  updateVouchers(voucher) {
    dispatch(Action.neigou.update(voucher))
  }
})

Component(
  connectComponent(
    mapStateToProps,
    mapDispatchToProps
  )({
    properties: {},

    data: {
      orderOutline: null,

      // 内购凭证
      vouchers: null,

      currentTab: "custom"
    },

    behaviors: [computedBehavior],

    methods: {
      onLoad: function (options) { },

      onReady: function () {
        setTimeout(() => {
          console.log("userProfile", this.data.userProfile)
        }, 2000)

        if (!this.data.neigou) {
          this.fetchVouchers()
            .then(res => {
              this.updateVouchers(res)
            })
            .catch(err => console.error(err))
        }
      },

      onShow: function () {
        this.getTabBar().setData({ current: "profile" })
        if (!this.data.orderOutline) {
          this.data.orderOutline = this.selectComponent("#my-order-outline")
        }
        this.data.orderOutline.updateCount()
      },

      onHide: function () { },

      onUnload: function () { },

      /**
       * 切换到卖家
       */
      async onSwitchRole() {
        await wx.showLoadingAsync()

        // 查看自己店铺
        const shopId = this.data.sellerProfile.shop.id
        const context = await Api.Share.setReferrer({ shopId, referrerId: 0 })

        // 更新用户访问小程序的上下文
        context.isMerchant = true
        switchContext(context)
        // this.setContext(context)

        await wx.hideLoadingAsync()

        router.go("merchantCenter")
      },

      onPullDownRefresh: function () { },

      onReachBottom: function () { },

      onShareAppMessage: function () { },

      async fetchVouchers() {
        return Api.InternalBuy.balance()
      }
    }
  })
)
