import procedures from '../index.js'

Page({
  data: {
    form: {
      btn: {
        disabled: true
      }
    },
    users: {
      list: [{
        id: 'u1',
        nickname: '尖尖实验室',
        count: {
          article: 999,
          followed: 99
        }
      }, {
        id: 'u2',
        nickname: '尖尖实验室',
        count: {
          article: 999,
          followed: 99
        }
      }, {
        id: 'u3',
        nickname: '尖尖实验室',
        count: {
          article: 999,
          followed: 99
        }
      }],
      
      isLoading: false,
      hasMore: false
    }
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onLoad() {
    procedures.get(this.data.sid).register(this)
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 搜索地点
   * @param {object} detail - 表单内容
   */
  searchUser({detail}) {
    console.log(detail)
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
   * 点击用户列表中的用户触发的事件
   * @param {event} e - 事件
   */
  onTapUser(e) {
    const index = e.currentTarget.dataset.index
    // do something

    procedures.get(this.data.sid).asProcedure().emit('complete', this.data.users.list[index])
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