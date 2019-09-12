// pages/my/index.js
//获取应用实例
var app = getApp()
const api = require('../../utils/api.js')
import { numberFormat } from '../../utils/common.js';

// wx.setNavigationBarColor({
//   frontColor: '#ffffff',
//   backgroundColor: '#ff0000',
//   animation: {
//     duration: 1400,
//     timingFunc: 'easeIn'
//   }
// })

// wx.setTabBarStyle({
//   color: '#FF0000',
//   selectedColor: '#00FF00',
//   backgroundColor: '#0000FF',
//   borderStyle: 'white'
// })
console.log(numberFormat(276500))
Page({
  data: {
    isMySelf: true,
    hasFoucsed: false,
    bgShow: {
      // btnTitle:'快去设置背景',
      bg: "http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96"
    },
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
      { name:'直播', page: 0 },
      { name: "动态", page: 0 },
    ],
    currentTab: 0,
    list: [Array(12), Array(12), Array(6)],
    currentItemNum: 0,
    windowHeight: ''

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

  focusStoreHandle: function (e) {
    if (this.data.hasFoucsed) {
      wx.showToast({
        title: '取消关注成功',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      wx.showToast({
        title: '关注店铺成功',
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
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log("show", e)
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
  onPullDownRefresh: function (e) {
    console.log("下拉", e)
  },

  onPullDownRefresh: function (e) {
    console.log(e)
  },
  onPageScroll: function (e) {
    // console.log(e)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log("触底", e)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log("onshare", e)
  }
})
