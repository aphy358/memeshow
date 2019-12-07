// pages/ecommerse/checkout/index.js
//地址
const address = {
  name: '王麻子',
  mobile: 13839879875,
  privince: '广东省',
  city: '广州市',
  area: '天河区',
  detail: '保利克洛维大厦A座1405'
}
const lists = [
  {
    shop: { id: 1, logo: 'http://pic.58pic.com/58pic/12/37/96/03758PICzns.jpg', name: '贝亲蕾丝专卖店'},
    products: [
      { id: 1, src: 'http://img11.360buyimg.com/n7/jfs/t23479/205/2463779856/621239/e526fb5d/5b7f6369N352789f3.jpg', title: '黑色蕾丝', subtitle: '丁氏格澜 睡衣女睡裙女夏纯色套头冰丝性感诱惑情趣内衣家居服J44729 粉色 均码', salePrice: 990, realPrice: 99, num: 2 },
      { id: 2, src: 'http://img14.360buyimg.com/n7/jfs/t29323/137/142900/92549/131cb5b3/5be50780N212cb7e6.jpg', title: '黑色蕾丝', subtitle: '媚火 女士性感睡衣蕾丝花边仿真丝吊带情趣睡裙无袖薄款内衣短裙家居服 粉色', salePrice: 990, realPrice: 99, num: 3 }
    ]
  },
  {
    shop: { id: 2, logo: 'http://pic.58pic.com/58pic/12/37/96/03758PICzns.jpg', name: '紫云特供店' },
    products: [
      { id: 1, src: 'http://img13.360buyimg.com/n7/jfs/t1/4692/32/11472/490775/5bce95cdE92496f8e/5d9d0660795074ed.jpg', title: '食品', subtitle: '良品铺子肉松饼（约10个）传统糕点面包  办公室零食小吃 休闲早餐', salePrice: 990, realPrice: 99, num: 2 },
      { id: 2, src: 'http://img11.360buyimg.com/n7/jfs/t20365/316/1216991915/173915/859d65d4/5b221170Nfc40038d.jpg', title: '黑色蕾丝', subtitle: '乐事（Lay’s）无限薯片 休闲零食 104g*3组合装（原味+烤肉+番茄）百事食品', salePrice: 990, realPrice: 99, num: 3 }
    ]
  },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: lists,
    address: address
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})