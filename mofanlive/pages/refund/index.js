Page({
  data: {
    info: {
    }
  },

  onReady() {
    this.setData({
      info: {
        id: "201907222103260000030200",
        createTime: "2019-07-22 21:03:26",
        reason: "拍错/多拍/不喜欢",
        type: "退款退货",
        amount: 5900,
        products: [
          {
            "itemId": "itemId1",
            "skuId": "skuId1",
            "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
            "specs": "蓝色 中码",
            "price": 12300,
            "quantity": 1,
            "amount": 12300,
            "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
            "image": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
            "refundStatus": 0,
            "deliveryStatus": "已发货",
          }
        ]
      },
      actions: [
        {
          key: 'cancel',
          title: '撤销申请',
        }
      ]
    })
  },

  /**
   * 点击底部操作
   * @param {event} e 
   */
  handleClick(e) {
    console.log(ek)
  },

  /**
   * 跳转到协商页面
   */
  navToRecords() {
    console.log('records')
    wx.navigateTo({
      url: "/pages/refund-record/index"
    })
  },
})