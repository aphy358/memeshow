// pages/video/getuserinfo.js
const api = require('../../utils/api.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '授权用户信息'
    })
  },

  getUserInfo: function (e) {
    console.log('getUserInfo: ', e)
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      api.updateUserInfo(e.detail.userInfo, function (user) {
        app.globalData.userInfo = e.detail.userInfo;
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        // 授权完成返回首页
        wx.navigateBack()
      });
    } else {
      console.log('拒绝授权')
    }
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