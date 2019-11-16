import procedures from '../index'

Page({
  data: {
    sid: ''
  },
  onLoad(options) {
    this.data.sid = options.sid
  },
  onReady() {
    procedures.get(this.data.sid).register(this)
  },
  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },
  handleClickNxt() {
    wx.navigateTo({
      url: `./edit?sid=${this.data.sid}`
    })
  }
})