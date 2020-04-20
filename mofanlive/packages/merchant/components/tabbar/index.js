import { safeArea } from "ui-kit/behaviors"
const router = wx.X.router

Component({
  behaviors: [safeArea()],

  properties: {
    current: {
      type: String,
      value: "", // profile, market
    }
  },

  methods: {
    redirectToMarket() {
      if (this.data.current == 'market') return
      router.go("market")
    },
    redirectToProfile() {
      if (this.data.current == 'profile') return
      router.go("merchantCenter")
    },
    openLive() {
      router.navigate("editLive")
    },
  }
})