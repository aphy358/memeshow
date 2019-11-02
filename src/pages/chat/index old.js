// pages/message.js

import {msgData} from '../../data/message.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
   msgData:msgData,
  },

  onTabItem:function(res){
    console.log(res)
    wx.navigateTo({
      url: `/packageContent/pages/message/${res.currentTarget.dataset.type}_msg_list/index`,
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
  onShow: function (e) {
    console.log(e, this.getTabBar())
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    if (this.animation) {
      this.setData({ animationType: this.animation })
      console.log(this.data.animationType)
    };
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