// pages/ecommerse/cart/index.js
const carts = [
  { id: 1, src: 'http://img11.360buyimg.com/n7/jfs/t23479/205/2463779856/621239/e526fb5d/5b7f6369N352789f3.jpg', title: '黑色蕾丝', subtitle: '丁氏格澜 睡衣女睡裙女夏纯色套头冰丝性感诱惑情趣内衣家居服J44729 粉色 均码', salePrice: 990, realPrice: 99, num: 2 },
  { id: 2, src: 'http://img14.360buyimg.com/n7/jfs/t29323/137/142900/92549/131cb5b3/5be50780N212cb7e6.jpg', title: '黑色蕾丝', subtitle: '媚火 女士性感睡衣蕾丝花边仿真丝吊带情趣睡裙无袖薄款内衣短裙家居服 粉色', salePrice: 990, realPrice: 99, num: 3 }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: carts
  },

  /**
   * 跳转到结算中心
   */
  switchToCheckout() {
    wx.navigateTo({
      url: '/pages/ecommerse/checkout/index',
    })
  },
  /**
   * 购物车商品数量加减
   */
  reduce(e) {
    const id = e.currentTarget.id
    const num = e.currentTarget.dataset.num
    if(num>1) {
      this.data.carts.forEach((item, index) => {
        if(item.id == id) {
          this.setData({
            ["carts[" + index + "].num"]: --this.data.carts[index].num
          })
        }
      })
    }else {
      wx.showToast({
        title: '数量不能为零',
        duration: 1000,
      })
    }
  },
  add(e) {
    const id = e.currentTarget.id
    this.data.carts.forEach((item, index) => {
      if (item.id == id) {
        this.setData({
          ["carts[" + index + "].num"]: ++this.data.carts[index].num
        })
      }
    })
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