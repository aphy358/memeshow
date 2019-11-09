import procedures from '../index'
import _ from 'lodash'

Page({
  data: {
    sid: '',

    addition: [
      {
        title: "添加地点",
        key: "location"
      },
      {
        title: "添加商品",
        key: "product"
      }
    ],

    cover: '',
    topic: [],
    relation: [],
    location: null,
    title: ''
  },
  onLoad(options) {
    this.data.sid = options.sid
  },

  handleInputTitle(e) {
    const value = e.detail.value
    this.setData({
      title: value
    })
  },

  /**
   * 处理点击 #话题 事件
   */
  handleAddTopic() {
    const topicSelector = procedures.open('select-topic')
    const emiiter = topicSelector.asCaller()

    const that = this
    emiiter.on('complete', data => {
      that.data.topic.push(data)
      that.setData({
        title: that.data.title + `#${data.title} `
      })
    })
  },

  /**
   * 处理点击 @好友 事件
   */
  handleMention() {
    const relationSelector = procedures.open('select-relation')
    const emitter = relationSelector.asCaller()

    const that = this
    emitter.on('complete', data => {
      that.data.relation.push(data)
      that.setData({
        relation: that.data.relation,
        title: that.data.title + `@${data.nickname} `
      })
    })
  },

  /**
   * 处理选择封面事件
   */
  handleSelectCover() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        const path = res.tempFilePaths[0]

        // todo upload
        // todo get asset id

        that.setData({
          cover: path
        })
      }
    })
  },

  /**
   * 处理点击列表
   * @param {event} e - 点击事件
   */
  handleAddAddition(e) {
    const key = e.currentTarget.dataset.key
    switch (key) {
      case 'location':
        this.addLocation()
        break
      case 'product':
        this.addProduct()
        break
    }
  },

  /**
   * 添加地址
   */
  addLocation() {
    const that = this
    wx.chooseLocation({
      success(res) {
        const index = that.data.addition.findIndex(it => it.key === 'location')
        that.data.addition[index].title = res.name
        that.setData({
          location: res.name,
          addition: that.data.addition
        })
      },
      fail(err) {
        console.error(err)
      }
    })

    // const locationSelector = procedures.open('select-location')
    // const emitter = locationSelector.asCaller()
    // const that = this
    // emitter.on('complete', data => {
    //   const index = that.data.addition.findIndex(it => it.key === 'location')
    //   that.data.addition[index].title = data.name
    //   that.setData({
    //     location: data,
    //     addition: that.data.addition
    //   })
    // })
  },

  /**
   * 添加商品
   */
  addProduct() {

  },

  /**
   * 提交
   */
  handleSubmit() {
    wx.showLoading({})

    // todo: submit form
    
    const sid = this.data.sid
    setTimeout(() => {
      wx.hideLoading()
      const emitter = procedures.get(sid).asProcedure()
      emitter.emit('toCaller', 'ok')
      emitter.emit('complete', 'ok')
      wx.navigateBack({ delta: 1 })
    }, 2000)
  }
})