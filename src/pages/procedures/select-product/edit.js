import procedures from '../index'

Page({
  data: {
    sid: 0,
    id: null,
    item: {
      id: '1',
      title: '豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱豆瓣酱',
      soldCount: 122,
      profit: 1.5,
      price: 15.5,
      image: 'http://img.hznzcn.com/images/goods_new/20180529/20180529163304418.jpg'
    },
    form: {
      btn: {
        disabled: true
      }
    }
  },
  onLoad(options) {
    const sid = options.sid
    this.data.id = options.id
    this.setData({ sid })
  },

  /**
   * 处理表单提交
   * @param {object} detail - 表单内容
   */
  handleFormSubmit({ detail }) {
    const shotTitle = detail.value.shotTitle

    const instance = procedures.get(this.data.sid)
    const emitter = instance.asProcedure()
    emitter.emit('toCaller', { title: shotTitle })

    emitter.emit('complete', { title: shotTitle })
    wx.navigateBack({ delta: 2 })
  },

  /**
   * 输入框输入时的动作
   */
  onInput({ detail }) {
    this.setData({
      'form.btn.disabled': detail.cursor < 1
    })
  }
})