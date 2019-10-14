import procedures from '../index'
Page({
  data: {
    sid: null
  },
  onLoad(options) {
    this.data.sid = options.sid
    // regiter this page as procedure
    procedures.get(this.data.sid).register(this)
  },
  onReady() {
    const that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.emitLoc(res)
      },
      fail(err) {
        that.emitErr(err)
        console.error(err)
      }
    })
  },

  /**
   * 将地址抛出
   * @param {object} loc - api返回的数据
   */
  emitLoc(loc) {
    const instance = procedures.get(this.data.sid).asProcedure()
    instance.emit('complete', loc)
    wx.navigateBack({ delta: 1 })
  },

  /**
   * 处理错误信息
   * 
   * @param {Error} err 
   */
  handleErr(err) {
    // so something

    const instance = procedures.get(this.data.sid).asProcedure()
    instance.emit('error', err)
    wx.navigateBack({ delta: 1 })
  }
})