import { order } from '@/data/order'
Page({
  data: {
    id: "",
    info: [],
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
  },

  onReady() {
    this.init()
  },

  init() {
    const id = this.data.id

    this.setData({
      ...order,
      info: [
        {
          label: "订单编号",
          content: "2345678912345688"
        },
        {
          label: "订单类型",
          content: "交易资金担保服务"
        },
        {
          label: "支付方式",
          content: "微信"
        },
        {
          label: "下单账号",
          content: "15228559662"
        },
        {
          label: "下单时间",
          content: "2019-07-06 12:25:53"
        },
        {
          label: "支付时间",
          content: "2019-07-06 12:25:53"
        },
        {
          label: "发货时间",
          content: "2019-07-10 13:03:28"
        },
        {
          label: "订单来源",
          content: "魔范小店小程序"
        },
      ]
    })
  },

  /**
   * 处理操作点击
   * @param {event} e 
   */
  handleAction(e) {
    const action = e.detail.key
    console.log(action)
  },

  /**
   * 处理点击退款按钮
   * @param {event} e 
   */
  handleRefund(e) {
    console.log(e.detail)
    const sku = e.detail

    if (sku.refundStatus === 0) {
      this.createRefund(sku)
    } 
    else if (sku.refundStatus != 0) {
      this.navToRefund(sku)
    }
  },

  /**
   * 创建一个退款单
   * @param {Object} sku 
   */
  createRefund(sku) {
    const instance = wx.X.procedures.open("create-refund")
    instance.asCaller().emit('init', {
      title: "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
      amount: 9900,
      orderId: 'orderId1',
      createTime: '2019-12-20 12:00',
      refundAmount: 8800,
    })
  },

  /**
   *  跳转到已经申请退款的sku的退款详情
   * @param {Object} sku 
   */
  navToRefund(sku) {
    wx.navigateTo({
      url: "/pages/refund/index",
    })
  }
})