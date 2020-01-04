const { globalProcedures: procedures } = getApp().globalData

Page({
  data: {
    popupNext: ""
  },

  onLoad(options) {
    procedures.register(this)
  },

  onUnload() {
    procedures.unRegister(this)
  },

  onOpenPage() {
    procedures.open({ type: "page", target: "proce1" })
  },

  onOpenPopup() {
    this.setData({ popupNext: "f1" })
  },

  openF2() {
    this.setData({ popupNext: "f2" })
  },

  openF3() {
    this.setData({ popupNext: "f3" })
  }
})
