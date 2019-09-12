//获取应用实例
var app = getApp()
const api = require('../../utils/api.js')
import { numberFormat } from '../../utils/common.js';

console.log(numberFormat(276500))
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      id: "845421031",
      sign: "生活在别处！",
      nickName: "骞",
      motto: '填写个性签名更容易获得别人关注呃！',
      like: 5,
      focus: 23,
      fans: 276500,
      photo: 23,
      collect: 49,
      dynamics: 12,
      log: '你看到了日志',
      avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Ylib33UuwG3TE0bK6cibd5S9sSP2mx2kyDDicyXKaJxSBDcMvANHgIR8kezUG7norOg1SVeiabpJiaH3v5Qia4NmoooA/132",
    },
    tList: [
      { name: "推荐", page: 0 },
      { name: "关注", page: 0 },
      { name: "身边", page: 0 },
    ],
    currentTab: 0,

    list: [Array(12), Array(2), Array(5)],
    currentItemNum: 0,
    goodsMap: [{}, {}, {}, {}, {}],
    logisticsMap: [{}, {}, {}, {}, {}],
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    windowHeight: app.globalData.windowHeight

  },

  // onLoad(options){
  //   // this.getList();
  //   // var systemInfo = wx.getSystemInfoSync()
  //   // this.setData({
  //   //   windowHeight: systemInfo.windowHeight,
  //   //   currentType:options.id ? options.id:0
  //   // })
  // },
  // 点击tab切换 
  swichNav: function (res) {
    console.log(res)
    if (this.data.currentTab == res.detail.currentNum) return;
    this.setData({
      currentTab: res.detail.currentNum
    })
  },

  bindChange: function (e) {
    console.log("change", e, this.data.list[e.detail.current].length)
    this.setData({
      currentTab: e.detail.current,
      currentItemNum: this.data.list[e.detail.current].length,
    })

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // if (!this.data.list[e.detail.current].length)
    // this.getList();
  },

  bindFocus: function (e) {
    if (this.data.hasFoucsed) {
      wx.showToast({
        title: '取消关注',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({
      hasFoucsed: !this.data.hasFoucsed
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //调用应用实例的方法获取全局数据



    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    this.setData({
      userInfo: { ...this.data.userInfo, fans: numberFormat(276500) }
    })
    // })
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

