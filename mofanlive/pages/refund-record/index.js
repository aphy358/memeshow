import { record, order } from "@/data/record"

Page({
  data: {
    record: [],
    info: {}
  },

  onReady() {
    this.setData({ record, info: order })
  },
  createMessage() {
    console.log('fuck')
    const onComplete = (data) => {
      console.log(data)
    }
    const onError = (err) => { console.log(err) }
    const instance = wx.X.procedures.open("create-refund-message", null, onComplete, onError)
  }
})