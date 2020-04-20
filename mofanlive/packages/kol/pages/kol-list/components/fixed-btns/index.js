import { safeArea } from "ui-kit/behaviors"

Component({
  behaviors: [safeArea()],

  methods: {
    onReleaseTap() {
      wx.X.router.go("kolRelease")
    },
    onTasksTap() {
      wx.X.router.go("kolTaskList")
    }
  },

  options: {
    addGlobalClass: true
  }
})