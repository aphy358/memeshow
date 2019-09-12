
var {categories,mediumItems,articleItems} = require('../../data/index.js')
import { connect } from '../../plugins/redux/index.js'

const app = getApp()
let store = app.store

let pageConfig = {
  data: {
    toRight:true,
    noticeList: null,
    hasCoupons: false,
    categories: categories,
    currentTab:0,
    activeCategoryId: 1,
    scrollTop: 1,
    scrollLeft:10,
    scrollIntoItem:1,
    toView: 0,
    list: {
      data0: null,
      data1: null,
      data2: null,
      data3: null,
      data4: null,
      data5: null,
      data6: null,
      data7: null,
      data8: null,
      data9: null,
      data10: null,
    },
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '', //导航栏 中间的标题
    },
  },
  gotoIM(){
    // wx.navigateTo({
    //   url: '/packages/IM/pages/login/login',
    // })
    wx.navigateTo({
      url: '/pages/aaa/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad",options)
    if (options.pagename) {
      wx.navigateTo({
        url: '../article/detail',
      })
    }

    wx.showLoading({
      "mask": true
    })
    setTimeout(() => {
        this.setData({
          list: { ...this.data.list, data0: mediumItems}
        }, () => { 
          // 
          wx.hideLoading(); 
          console.log(this.data.list) })
    }, 500)
  },
  //进入商户个人中心
  toCustomer() {
    wx.navigateTo({
      url: '/pages/customer/index',
    })
  },
  //点赞
  like() {

  },
  /**
   * 切换导航
   */
  switchNav(e) {
    console.log(e.currentTarget.dataset.current)
    if (this.data.currentTab == e.currentTarget.dataset.current) return;
    
     this.setData({
       currentTab: e.currentTarget.dataset.current,
     })
  },
   
  changePage: function (e) {
    setTimeout(() => {
      if (e.detail.current > this.data.toView) {
        this.setData({
          toView: e.detail.current - 2
        }, () => console.log(this.data.toView))
      } else if (e.detail.current <= this.data.toView) {
        this.setData({
          toView: e.detail.current - 1
        }, () => console.log(this.data.toView))
      }
      if (e.detail.current == 1) {
        this.setData({
          currentTab: e.detail.current,
          list: { ...this.data.list, data1: articleItems }
        }, () => { 
          // wx.hideLoading(); 
          console.log(this.data.list) })
      } else {
        this.setData({
          currentTab: e.detail.current,
          list: { ...this.data.list, ['data' + e.detail.current]: mediumItems }
        }, () => { 
          // wx.hideLoading(); 
          console.log(this.data.list) })
      }
    }, 500)
  },
  /**
  * 跳转到搜索页面
  */
  search() {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      height: app.globalData.statusBarHeight + app.globalData.titleBarHeight
    });
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

  },

  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
  }
}

let mapStateToData = (state) => {
  return {
    testData: state.testData || store.getState().testData
  }
}
const mapDispatchToPage = (dispatch) => ({
})
let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

Page(connectedPageConfig)

// function shuffle(a) {
//   var b = [];
//   while (a.length > 0) {
//     var index = parseInt(Math.random() * (a.length - 1));
//     b.push(a[index]);
//     a.splice(index, 1);
//   }
//   return b;
// }
