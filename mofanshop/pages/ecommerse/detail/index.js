// pages/ecommerse/detail/index.js
const productList = [
  { id: 1, src: 'http://img10.360buyimg.com/n7/jfs/t20473/229/90983794/182834/e3bec923/5afa6dadN0f6e7e0d.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 2, src: 'http://img10.360buyimg.com/n7/jfs/t28162/259/291267933/273203/457a5e3/5bee2e47N26e59185.jpg', title: '黑色蕾丝', subtitle: '明星同款连衣裙', salePrice: 990, realPrice: 99 },
  { id: 3, src: 'http://img13.360buyimg.com/n7/jfs/t1/2092/21/13159/441903/5bd6af30Ea115e0b3/38687e8236aab2a4.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 4, src: 'http://img10.360buyimg.com/n8/jfs/t28294/203/22513571/259368/2b15f26a/5be57d4fN2eb96aa6.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 5, src: 'http://img12.360buyimg.com/n8/jfs/t24763/126/1761165441/377202/dcf292d5/5bbb6ac4Nbb6c064f.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 6, src: 'http://img12.360buyimg.com/n8/jfs/t27166/231/873747456/86736/77ad6b29/5bbb6acfNa0782109.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 7, src: 'http://img13.360buyimg.com/n7/jfs/t26776/27/985295968/276534/c37eeeea/5bbed40bNf10b4fe4.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls: [
      'http://img11.360buyimg.com/n7/jfs/t25555/49/350163876/331330/c0c09041/5b6bde52N5ffb3955.jpg',
      'http://img13.360buyimg.com/n7/jfs/t25279/255/588519597/223638/d216febc/5b750ff5Nc38e1d06.jpg',
      'http://img13.360buyimg.com/n7/jfs/t26734/315/1753148340/303035/63f3a5a3/5bed1921N6b6b3a90.jpg'
    ],
    productList: productList
  },
  /**
   * 进入购物车
   */
  toCart() {
    wx.navigateTo({
      url: "/pages/ecommerse/cart/index",
    })
  },
  /**
   * 进入商店
   */
  intoShop() {
    wx.navigateTo({
      url: "/pages/customer/index",
    })
  },
  /**
   * 加入购物车
   */
  addCart() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
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