import procedures from "../../../index"

Page({
  data: {
    paddingBottom: 0,
    sid: ""
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const sys = wx.getSystemInfoSync()
    const paddingBottom = sys.screenHeight - sys.safeArea.bottom
    this.setData({ paddingBottom })

    procedures.get(this.data.sid).register(this)
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },

  /**
   * 提交
   * @param {Object} e 
   */
  submit(e) {
    console.log(e)
  },

  /**
   * 询问如何获取链接
   */
  handleTapQuestion() {

  }
})