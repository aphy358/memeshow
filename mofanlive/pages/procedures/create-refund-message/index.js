const procedures = wx.X.procedures

Page({
  data: {
    sid: "",

    images: [],
  },
  onLoad(options) {
    this.data.sid = options.sid
  },
  onReady() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.register(this)
    }
  },
  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },
  changeImages(e) {
    console.log(e)
  },
  submit(e) {
    console.log(e.detail)

    // todo POST
    this.emit()
  },
  cancel() {
    this.emit()
  },
  emit(data = null) {
    const instance = procedures.get(this.data.sid)
    instance.asProcedure().emit('complete')
    wx.navigateBack({ delta: 1 })
  },
  changeImages(e) {
    this.setData({
      images: e.detail
    })
  }
})