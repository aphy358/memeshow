import _ from 'lodash'
import procedures from '../../../index'

Page({
  data: {
    title: '',
    end: {
      date: {
        content: '',
        start: ''
      },
      time: {
        content: ''
      }
    },
    type: {
      range: ['单选', '多选'],
      value: 0
    },
    options: [
      {
        text: ''
      },
      {
        text: ''
      },
    ],

    sid: '',
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)

    const emitter = instance.asProcedure()
    emitter.on('init', data => {
      this.init(data)
    })

    const now = new Date()
    const start = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`

    this.setData({
      "end.date.start": start
    })
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 
   * @param {Object} data 
   */
  init(data) {
    const options = data.options
    while (options.length < 2) {
      options.push({ text: '' })
    }
    this.setData({
      options,
      title: data.title,
      "end.date.content": data.date,
      "end.time.content": data.time,
      "type.value": data.type,
    })
  },

  /**
   * 增加选项
   */
  handleAddOption() {
    const options = this.data.options
    const newOption = {
      text: ''
    }
    this.setData({
      [`options[${options.length}]`]: newOption
    })
  },

  /**
   * 删除选项
   * @param {Object} e 
   */
  handleRemoveOption(e) {
    const index = e.currentTarget.dataset.index

    this.data.options.splice(index, 1)
    this.setData({
      options: this.data.options
    })
  },

  /**
   * 处理选项输入
   * @param {Object} e 
   */
  handleOptionInput(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      [`options[${index}].text`]: e.detail.value
    })
  },

  /**
   * 选择日期的事件
   * @param {Object} e 
   */
  handleDateChange(e) {
    this.setData({
      "end.date.content": e.detail.value,
      "end.time.content": this.data.end.time.content || "23:59"
    })
  },

  /**
   * 选择时间的事件
   * @param {Object} e 
   */
  handleTimeChange(e) {
    this.setData({
      "end.time.content": e.detail.value
    })
  },

  /**
   * 选择类型事件
   * @param {Object} e 
   */
  handleTypeChange(e) {
    const value = parseInt(e.detail.value)
    this.setData({
      "type.value": value,
      "type.content": this.data.type.range[value]
    })
  },

  /**
   * 提交
   * @param {Object} e 
   */
  submit(e) {
    const values = e.detail.value

    const options = _.filter(this.data.options, it => !!it.text)

    const emitter = procedures.get(this.data.sid).asProcedure()
    emitter.emit('getVote', {
      ...values,
      options
    })
    emitter.emit('complete')
    wx.navigateBack({ delta: 1 })
  }
})