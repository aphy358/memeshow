import procedures from '../index.js'

Page({
  data: {
    form: {
      btn: {
        disabled: true
      }
    },

    categories: {
      list: [{
        id: 'c1',
        title: '推荐'
      }, {
        id: 'c2',
        title: '美食'
      }, {
        id: 'c3',
        title: '推荐'
      }, {
        id: 'c4',
        title: '美食'
      }, {
        id: 'c5',
        title: '推荐'
      }, {
        id: 'c6',
        title: '美食'
      }],
      current: 0
    },

    topic: {
      list: [{
        id: 't1',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't2',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't3',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't4',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't5',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't6',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't7',
        title: '七夕恋爱物语',
        popularity: '88万'
      }, {
        id: 't8',
        title: '七夕恋爱物语',
        popularity: '88万'
      }],

      isLoading: false,
      hasMore: true
    }
  },

  /**
   * @param {object} options 页面参数
   */
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
  /**
   * 当输入框有输入时 使能确认按钮
   * @param {object} detail - 输入框输入事件
   */
  onInput({detail}) {
    this.setData({
      'form.btn.disabled': detail.cursor < 1
    })
  },

  /**
   * 搜索话题
   * @param {object} detail - 表单内容
   */
  searchTopic({detail}) {
    const keyword = detail.value.keyword
    console.log(keyword)
  },

  /**
   * 点击目录时触发的handler
   * @param {event} e - 点击目录的事件
   */
  onTapCategory(e) {
    const id = e.currentTarget.dataset.id
    const index = this.data.categories.list.findIndex((it) => it.id === id)
    if (index > -1 && this.data.categories.current != index) {
      this.setData({
        'categories.current': index
      })
    }
  },

  /**
   * 点击话题时触发的handler
   * @param {event} e - 点击话题的时间
   */
  onTapTopic(e) {
    const index = e.currentTarget.dataset.index
    // do something
    const emitter = procedures.get(this.data.sid).asProcedure()
    emitter.emit('toCaller', this.data.topic.list[index])
    emitter.emit('complete', this.data.topic.list[index])
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