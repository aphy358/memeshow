import { connectPage } from "wx-redux"
import Action from "@/redux/action"
import { switchContext } from "@/utils/context"
import share from "@/utils/share.js"

const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({
  referrer: state.referrer,
  sellerProfile: state.sellerProfile,
  userProfile: state.userProfile
})
const mapDispatchToProps = dispatch => ({
  setContext(context) {
    dispatch(Action.context.update(context))
  }
})

Page(
  connectPage(
    mapStateToProps,
    mapDispatchToProps
  )({
    data: {
      currentTab: "profile"
    },

    orders: null,

    onShow: function () {
      if (!this.orders) {
        this.orders = this.selectComponent("#my-order-outline")
      }
      this.orders.updateCount()
      this.getTabBar().setData({ current: "profile" })
    },

    /**
     * 切换到买家
     */
    async onSwitchRole() {
      await wx.showLoadingAsync()

      // 恢复用户进入小程序的上下文
      const { shopId, referrerId } = this.data.referrer
      const context = await Api.Share.setReferrer({ shopId, referrerId })

      // 更新用户访问小程序的上下文
      context.isMerchant = false
      switchContext(context)

      // this.setContext(context)

      await wx.hideLoadingAsync()

      // 跳转页面
      router.switchTab("userCenter")
    },

    onShareAppMessage() {
      const { shop, employee } = this.data.sellerProfile
      return share.shareShop(employee.referrerId, shop.id)
    }
  })
)
