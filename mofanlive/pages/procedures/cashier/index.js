import _ from 'lodash'
const procedures = wx.X.procedures

import address from "@/data/address"
import { trades } from "@/data/product"

Page({
  data: {
    addr: {},
    trades: []
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.register(this)
      instance.asProcedure().on('init', this.init)
    }

    // todo remove test init
    this.init()
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 初始化结算
   * @param {oject} data 
   */
  init(data) {
    console.log(data)
    console.log(trades)
    _.forEach(trades, trade => {
      _.forEach(trade.items, item => {
        item.spec = _.reduce(item.specs, (res, it) => {
          return `${res}; ${it.k}:${it.v}`
        }, "")
      })
    })
    this.setData({
      addr: address[0],
      trades
    })
  },

  changeAddress(e) {
    console.log(e)
  },

  /**
   * 提交订单
   * @param {event} e 
   */
  handleConfirm(e) {
    console.log(e)
  },

  options: {
    addGlobalClass: true,
  }
})