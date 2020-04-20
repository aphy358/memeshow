import { safeArea } from "ui-kit/behaviors"

Page({
  behaviors: [safeArea()],

  data: {
    text: "",
    placeholder: "请输入",
    max: 50,
    singleLine: false,

    sid: ""
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const instance = wx.X.procedures.get(this.data.sid)
    if (!!instance) {
      instance.register(this)
      const emittor = instance.asProcedure()
      emittor.on("init", this.init)
    }
  },

  onUnload() {
    const instance = wx.X.procedures.get(this.data.sid)
    if (!!instance) {
      instance.asProcedure().emit("complete")
    }
  },

  /**
   * 初始化 
   * @param {string} text 预设输入
   * @param {string} placeholder
   * @param {number} max 最大输入长度
   * @param {boolean} singleLine 单行输入
   */
  init({ text, placeholder, max, singleLine }) {
    if (!!text) this.data.text = text
    if (!!placeholder) this.data.placeholder = placeholder
    if (max > 0) this.data.max = max
    this.data.singleLine = singleLine || false
    this.setData(this.data)
  },

  onEditorChange(e) {
    const text = e.detail.value
    this.setData({ text })
  },

  submit(e) {
    const emittor = wx.X.procedures.get(this.data.sid).asProcedure()
    emittor.emit("complete", { text: this.data.text })
    wx.navigateBack({ delta: 1 })
  },

  options: {
    addGlobalClass: true
  }
})