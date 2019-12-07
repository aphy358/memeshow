import procedures from '../../../index'

Page({
  data: {
    sid: '',
    text: ''
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const instance = procedures.get(this.data.sid).register(this)
    const emitter = instance.asProcedure()
    emitter.on('initText', data => {
      this.setData({
        text: data.text
      })
    })
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 点击确认事件
   * @param {Object} e 
   */
  handleSubmit(e) {
    const value = e.detail.value
    if (this.data.sid) {
      const emitter = procedures.get(this.data.sid).asProcedure()
      emitter.emit('getText', {
        text: value
      })
      emitter.emit('complete')
      wx.navigateBack({ delta: 1 })
    }
  },

  /**
   * 处理输入事件
   * @param {Object} e 
   */
  handleInput(e) {
    this.setData({
      text: e.detail.value
    })
  },
})