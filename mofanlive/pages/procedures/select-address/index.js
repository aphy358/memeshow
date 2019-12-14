import address from '@/data/address'

const procedures = wx.X.procedures

Page({
  data: {
    addr: {
      list: [],
    },

    sid: ""
  },

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
    if (instance) {
      instance.register(this)
    }

    this.init()
  },

  /**
   * 初始化地址列表
   */
  init() {
    // TODO use real data
    this.setData({
      "addr.list": address
    })
  },

  addAddress() {
    const onComplete = (data) => {
      // TODO
      console.log(data)
    }
    const onError = (err) => {
      // TODO
      console.log(err)
    }
    const instance = procedures.open("add-address", null, onComplete, onError)
  },

  editAddress(e) {
    const index = e.currentTarget.dataset.index
    console.log(index)
    const onComplete = data => {
      console.log(data)
    }
    const onError = err => {

    }
    const instance = procedures.open('add-address', null, onComplete, onError)
    const emitter = instance.asCaller()
    emitter.emit('edit', this.data.addr.list[index])
  }
})