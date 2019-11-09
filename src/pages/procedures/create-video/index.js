import procedures from '../index'

Page({
  data: {
    sid: ''
  },
  onLoad(options) {
    const sid = options.sid
    this.data.sid = sid
    const instance = procedures.get(sid)
    instance.register(this)
  },
  handleClickNxt() {
    wx.navigateTo({
      url: `./edit?sid=${this.data.sid}`
    })
  }
})