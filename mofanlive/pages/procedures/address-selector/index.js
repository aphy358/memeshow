import { connectPage } from "wx-redux"

const procedures = wx.X.procedures

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

/**
 * procedure: select address
 * 
 * emit: { event: complete, payload: address }
 */

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  data: {
    sid: "",
    selecting: true,  // 是否选择后退出
  },

  selector: null,

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
    if (!this.selector) {
      this.selector = this.selectComponent("#selector")
      this.selector.init()
      instance.asProcedure().on("selecting", data => {
        this.data.selecting = data.selecting
        if (data.selecting) {
          wx.setNavigationBarTitle({ title: "选择地址" })
        }
      })
    }
  },

  /**
   * 选择了地址
   * @param {Object} e
   */
  onSelectAddress(e) {
    if (!this.data.selecting) return;
    const addr = e.detail
    procedures.get(this.data.sid).asProcedure().emit("complete", addr)
    wx.navigateBack({ delta: 1 })
  },

  /**
   * 编辑地址或添加地址打开地址编辑器
   * @param {Object} detail
   */
  onOpenEditor({ detail }) {
    const instance = procedures.open("address-editor")
    if (detail && detail.preset) {
      instance.asCaller().emit("init", detail.preset)
    }
    instance.asCaller().on("complete", () => {
      this.selector.init()
    })
  }
}))