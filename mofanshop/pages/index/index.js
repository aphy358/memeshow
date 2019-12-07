// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: null,
    hasCoupons: false,
    categories: [],
    activeCategoryId: 1,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const categories = [
      { id: 1, name: '推荐' },
      { id: 2, name: '附近' },
      { id: 3, name: '快播视频' },
      { id: 4, name: '时尚达人' },
      { id: 5, name: '黑边蕾丝' },
      { id: 6, name: '彩妆' },
      { id: 7, name: '美食' },
      { id: 8, name: '古玩' },
      { id: 9, name: '服饰' },
      { id: 10, name: '饮品' },
      { id: 11, name: '白酒' },
      { id: 12, name: '茶叶' }
    ]

    const mediumItems = [
      {
        id:1,
        des:'网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
        url: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96',
        type: 'article',
        likes: 298,
        videoValue: 1, //关联视频的ID
        user: {
          name: '冯莫提',
          avatar: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96'
        }
       },
      {
        id: 2,
        des: '卫衣+裙子|潮潮的眨眼图案灰色卫衣|仙仙的轻纱裙 对她就是要外穿的街拍罩裙|🌟',
        url: 'https://wx2.sinaimg.cn/mw690/5eef6257gy1fwumlgz8krg20780abx6p.gif',
        type: 'video',
        likes: 298,
        videoValue: 2, //关联视频的ID
        user: {
          name: '冯莫提',
          avatar: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96'
        }
      },
      {
        id: 3,
        des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
        url: 'https://wx4.sinaimg.cn/mw690/5eef6257gy1fwx82b34ivg206w09znpd.gif',
        type: 'video',
        likes: 298,
        videoValue: 3, //关联视频的ID
        user: {
          name: '冯莫提',
          avatar: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96'
        }
      },
      {
        id: 4,
        des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
        url: 'http://wx.qlogo.cn/mmhead/ver_1/aaQWhYpDgkknRUqSVsRgsWWADnpEYwNSzxyLbwn6hN8ZndCfj1eR3S2oTCgibPsicleuLchtoWeFnjpT87a5TV92smLwa7fmR0IFS3DI9JibnU/132',
        type: 'article',
        likes: 298,
        videoValue: 4, //关联视频的ID
        user: {
          name: '冯莫提',
          avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
        }
      }
    ] 

    this.setData({
      categories: categories,
      mediumItems: mediumItems,
      navId: categories[0].id, //被选中的导航
    })
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
    wx.showLoading({
      "mask": true
    })
    const id= e.currentTarget.id
    console.info('navId:', id)
    this.setData({
      navId: id
    })
    setTimeout(()=> {
      wx.hideLoading()
    }, 1000)
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
    const systemInfo = wx.getSystemInfoSync()
    console.log('systemInfo:', systemInfo)
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
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})