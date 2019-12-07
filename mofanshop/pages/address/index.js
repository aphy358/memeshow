// pages/address /index.js
//收货地址数据
const pages = [
  {id: 1, name: '张三', mobile: 13829789876, province: '广东省', city: '广州市', area: '天河区', detail: '保利克洛维大厦A座1405', checked: false},
  { id: 1, name: '李四', mobile: 13829789876, province: '广东省', city: '深圳市', area: '宝安区', detail: '南山科技园腾讯大厦168号', checked: false }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses: pages
  },
  editAddress(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/address/edit?id=' + id,
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/address/edit',
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