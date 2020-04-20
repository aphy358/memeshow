import { safeArea } from "ui-kit/behaviors"

Component({
  behaviors: [safeArea()],
  methods: {
    oneClickCreateLive() {
      this.triggerEvent("one")
    },
    confirm() {
      this.triggerEvent("create")
    },
    navigateBack() {
      wx.navigateBack({ delta: 1 })
    },
  },
  options: {
    addGlobalClass: true
  }
})