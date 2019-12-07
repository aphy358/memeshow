// pages/home/my/index.js
//获取应用实例
var app = getApp()
const api = require('../../utils/api.js')
import { numberFormat } from '../../utils/common.js';
import { mediumItems} from '../../data/my.js';

Page({
  data: {
    pageType:'my',
    isMySelf: true,
    hasFoucsed: false,
    isPlaying: true,
    bgShow: {
      // btnTitle:'快去设置背景',
      bg: "http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96"
    },

    items: mediumItems,
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
      { name: `作品`, page: 0 },
      { name: "动态", page: 0 },
      { name: "喜欢", page: 0 },
    ],
    list: [Array(32), Array(22), Array(24)],
    currentTab: 0,
    currentItemNum: 0,
    windowHeight: '',
    scrollTop: 100,
  },
  
  // 关注·获赞·粉丝
  onTabItem: function (res) {
    console.log(res)
    wx.navigateTo({
      url: `/packageContent/pages/my/${res.currentTarget.dataset.type}`,
    })
  },
  
  // 进入我的订单
  onTapGoToOrderList:function(res){
    console.log(res)
    wx.navigateTo({
      url: '/packageStore/pages/order/order',
      params:{index:res.currentTarget.dataset.index}
    })
  },
  // 进入 我的收藏
  onTapCollectMenu:function(){
    wx.navigateTo({
      url: '/packageSetting/pages/my-collected',
    })
  },
  // setting
  onTapSetting:function(){
    wx.navigateTo({
      url: '/packageSetting/pages/setting',
    })
  },
  // 编辑资料
  onTapEditUserInfo:function(){
    wx.navigateTo({
      url: '/packageSetting/pages/index',
    })
  },

  // 进入名片页
  onTapGotoQRcode:function(){
    wx.navigateTo({
      url: '/packageSetting/pages/my-QR-code',
    })
  },
  // 进入店铺主页
  onTapGotoStoreHome: function (res) {
    let { type } = res.currentTarget.dataset;
    let url;
    if (type=='user'){
      url='/packageStore/pages/store/home/store'
    }else{
      url='/packageStore/pages/store/home/index'
    }
    wx.navigateTo({url:url})
  },

  // focus
  onTapFocus:function(){

  },


  // 分享操作
  onTapShare:function(){
    this.setData({
      isShowSharePanel: true
    })
  },

  onTapCloseActionPanel:function(){
    this.setData({
      isShowSharePanel:false
    })
  },

  shareAppMessage:function(){
    this.setData({
      isShowSharePanel: false
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() { 
        console.log(2)
      }
    })
  },


 

  // 进入金币明细
  onTapGotoGoldTokenDetails:function(){
    wx.navigateTo({
      url: '/packageRedPacket/pages/gold-coin-details/index',
    })
  },
  // 进入红包明细
  onTapGotoRedPacketDetails: function () {
    wx.navigateTo({
      url: '/packageRedPacket/pages/red-packet-details/index',
    })
  },
  // 进入活动页
  onTapCashout: function () {
    wx.navigateTo({
      url: '/packageRedPacket/pages/cash-out-list/index',
    })
  },
  
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
  playHandle: function () {
    console.log(this.data.isPlaying)
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  // 提现
  onTapCashOut:function(){
    wx.navigateTo({
      url: '/packageRedPacket/pages/goldCoinActivities/index',
    })
  },

  // 资产明细

  onTapGotoAccountDetails:function(){
    wx.navigateTo({
      url: '/packageRedPacket/pages/account-details/index',
    })
  },
 
  intersection:function(){
     this._observer1 = wx.createIntersectionObserver(this)
     this._observer1
       .relativeTo('.range-box')
       .observe('.my-content', (res) => {
         console.log(res.intersectionRatio, res.intersectionRect);
         this.setData({
           hasFixedWsTabs: res.intersectionRatio > 0
         })
       })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    console.log(options)

    this._observer1 = wx.createIntersectionObserver(this)
    this._observer1
      .relativeTo('.range-box')
      .observe('.my-content', (res) => {
        console.log("---------", res, res.intersectionRatio);
        this.setData({
          hasFixedWsTabs: res.intersectionRatio > 0
        })
      })

    // this.query = wx.createSelectorQuery(this)
    // this.query.select('.my-content').boundingClientRect()
    // this.query.selectViewport().scrollOffset()
    //更新数据
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log(e, this.getTabBar())
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
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
    if (this._observer1) this._observer1.disconnect()
    if (this._observer2) this._observer2.disconnect()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
    console.log("触底", res)
    if (this.data.isLoading == 1) { return }
    this.setData({ isLoading: 1 }, () => {
      this.mockLoadTimer && clearTimeout(this.mockLoadTimer);
      this.mockLoadTimer = null;
      this.mockLoadTimer = setTimeout(() => {
        this.setData({ isLoading: 2 })
      }, 500)
    })
  },
  // 自定义滚动触底
  onTapScrolltolower: function (res) {
    console.log(res)
    
  },

  onPageScroll(res) {
    let opacity = res.scrollTop/100
    this.setData({
      scrollTop: res.scrollTop,
      opacity: opacity
    });  

    
    // this.query.exec((e)=>{
    //   if(e[1].scrollTop>e[0].top){
    //     this.setData({
    //       hasFixedWsTabs: true
    //     }); 
    //   }else{
    //     this.setData({
    //       hasFixedWsTabs: false
    //     }); 
    //   }
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    // console.log("onshare", e)
  }
})
