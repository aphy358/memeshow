// pages/customer/index.js
const productList = [
  { id: 1, src: 'http://img10.360buyimg.com/n7/jfs/t20473/229/90983794/182834/e3bec923/5afa6dadN0f6e7e0d.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 2, src: 'http://img10.360buyimg.com/n7/jfs/t28162/259/291267933/273203/457a5e3/5bee2e47N26e59185.jpg', title: '黑色蕾丝', subtitle: '明星同款连衣裙', salePrice: 990, realPrice: 99 },
  { id: 3, src: 'http://img13.360buyimg.com/n7/jfs/t1/2092/21/13159/441903/5bd6af30Ea115e0b3/38687e8236aab2a4.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 4, src: 'http://img10.360buyimg.com/n8/jfs/t28294/203/22513571/259368/2b15f26a/5be57d4fN2eb96aa6.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 5, src: 'http://img12.360buyimg.com/n8/jfs/t24763/126/1761165441/377202/dcf292d5/5bbb6ac4Nbb6c064f.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 6, src: 'http://img12.360buyimg.com/n8/jfs/t27166/231/873747456/86736/77ad6b29/5bbb6acfNa0782109.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 },
  { id: 7, src: 'http://img13.360buyimg.com/n7/jfs/t26776/27/985295968/276534/c37eeeea/5bbed40bNf10b4fe4.jpg', title: '黑色蕾丝', subtitle: '2018春季新款韩版赫本小黑裙修身显瘦长袖打底针织鱼尾裙蕾丝连衣裙子女', salePrice: 990, realPrice: 99 }
]
const storyList = [
  {
    id: 1,
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
    id: 2,
    des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
    url: 'http://wx.qlogo.cn/mmhead/ver_1/aaQWhYpDgkknRUqSVsRgsWWADnpEYwNSzxyLbwn6hN8ZndCfj1eR3S2oTCgibPsicleuLchtoWeFnjpT87a5TV92smLwa7fmR0IFS3DI9JibnU/132',
    type: 'article',
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: '冯莫提',
      avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    nav: 'shop',
    storyList: []
  },
  /**
   * 切换导航
   */
  switchNav(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const currentNav = event.currentTarget.dataset.current
    const param = {}
    param.nav = currentNav
    param[currentNav === 'shop' ? 'productList' : 'storyList'] = currentNav === 'shop' ? productList : storyList
    console.error('param:', param)
    this.setData(param)
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productList: productList
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