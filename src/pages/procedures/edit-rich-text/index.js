import procedures from '../index'

Page({
  data: {
  },
  editorContext: null,
  onLoad(options) {
    // todo
    // const sid = options.sid
    // const instance = procedures.get(sid)
    // instance.register(this)
  },
  onReady() {
  },

  /**
   * when editor is ready
   */
  handleEditorReady() {
    const that = this
    if (!this.editorContext) {
      wx.createSelectorQuery().select('#the-rich-text-editor').context(function (res) {
        that.editorContext = res.context
      }).exec()
    }
  },

  handleEditorInput(e) {
    this.data.text = e.detail
    console.log(JSON.stringify(e.detail.text))
  },

  handleEditorFocus(e) {
    console.log(e)
  },

  handleEditorTouch(e) {
    console.log(e)
  },

  handle0() {
  },
  handle1() {
    this.editorContext.format('header', 'H1')
  },
  handle2() {
    this.editorContext.format('header', 'H3')
  }
})