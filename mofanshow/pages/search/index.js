// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearchLists: [],
    historicalSearchLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotSearchLists = [
      { id: 1, name: '冬补夏进', type: 'hot'},
      { id: 2, name: '超级无敌风火轮小单车', type: 'hot' },
      { id: 3, name: '兰博基尼', type: 'hot' },
      { id: 4, name: 'FF901', type: 'hot' },
      { id: 5, name: '维他奶', type: 'hot' },
      { id: 6, name: '可口可乐', type: 'hot' },
      { id: 7, name: '雀巢咖啡', type: 'hot' }
    ]
    const historicalSearchLists = [
      { id: 1, name: '辣条', type: 'history' },
      { id: 2, name: '杜蕾斯', type: 'history' },
      { id: 3, name: '解放军鞋', type: 'history' },
      { id: 4, name: '跳跳糖', type: 'history' },
      { id: 5, name: '弹珠', type: 'history' },
      { id: 6, name: '卡通图', type: 'history' },
      { id: 7, name: '九九乘法文具盒', type: 'history' }
    ]
    this.setData({
      hotSearchLists: hotSearchLists,
      historicalSearchLists: historicalSearchLists
    })
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