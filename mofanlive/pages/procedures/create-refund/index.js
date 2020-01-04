const procedures = wx.X.procedures

Page({
  data: {
    info: [],

    type: {
      selected: "",
      value: -1,
      range: ['仅退款', '退款退货'],
    },
    reason: {
      selected: "",
      range: [
        "多买/买错/不想要",
        "快递无记录",
        "少货/空包裹",
        "未按约定时间发货",
        "快递一直未送到",
        "其他",
      ],
    },
    proof: [],
    receive: {
      range: ['已收到货', '未收到货'],
      selected: ''
    },

    sid: '',
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
      instance.asProcedure().on('init', this.init)
    }
  },

  init(data) {
    const keyLabelMap = {
      orderId: '订单编号：',
      title: "商品名称：",
      amount: "付款金额：￥",
      createTime: "交易时间："
    }
    const info = []
    for (let key in keyLabelMap) {
      info.push({
        label: keyLabelMap[key],
        content: data[key]
      })
    }
    this.setData({
      info,
      refundAmount: data.refundAmount,
    })
  },

  handleSubmit(e) {
    console.log(e)
    procedures.get(this.data.sid).asProcedure().emit('complete')
    wx.navigateBack({ delta: 1 })
  },

  handleTypeChange(e) {
    this.setData({
      "type.selected": this.data.type.range[e.detail.value],
      "type.value": e.detail.value,
    })
  },

  handleReasonChange(e) {
    this.setData({
      "reason.selected": this.data.reason.range[e.detail.value]
    })
  },

  handleReceiveChange(e) {
    this.setData({
      "receive.selected": this.data.receive.range[e.detail.value]
    })
  },

  handleProofChange(e) {
    console.log(e)
    this.data.proof = e.detail
  }
})