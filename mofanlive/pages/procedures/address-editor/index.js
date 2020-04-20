import { connectPage } from "wx-redux"

const procedures = wx.X.procedures

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  data: {
    sid: ""
  },

  editor: null,

  onLoad(options) {
    this.data.sid = options.sid
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)

    if (!this.editor) {
      this.editor = this.selectComponent("#editor")
    }
    instance.asProcedure().on("init", (addr) => {
      this.editor.init(addr)
    })
  },

  exitEditor() {
    wx.navigateBack({ delta: 1 })
  }
}))