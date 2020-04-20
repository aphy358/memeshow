import "./assets/tabbar/user_default.png"
import "./assets/tabbar/user_active.png"
import "./assets/tabbar/home_default.png"
import "./assets/tabbar/home_active.png"
import { connectComponent } from "wx-redux"

const router = wx.X.router

Component(
  connectComponent(state => ({
    context: state.context,
    userProfile: state.userProfile
  }))({
    data: {
      current: {
        type: String,
        value: "" // [shop, profile]
      }
    },
    methods: {
      clickShop() {
        const url = "/pages/shop/index"
        router.go("shop")
      },
      clickMine() {
        this.data.context.isMerchant
          ? router.go("merchantCenter")
          : router.go("userCenter")
      }
    }
  })
)
