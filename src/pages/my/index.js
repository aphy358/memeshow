// pages/my/index.js
//获取应用实例
var app = getApp()
const api = require('../../utils/api.js')
import { numberFormat } from '../../utils/common.js';



// 设置状态栏背景和文字颜色
// wx.setNavigationBarColor({
//   frontColor: '#ffffff',
//   backgroundColor: '#ff0000',
// })

// 设置tabBar 样式
// wx.setTabBarStyle({
//   color: '#FF0000',
//   selectedColor: '#00FF00',
//   backgroundColor: '#0000FF',
//   borderStyle: 'white'
// })

// 设置page下拉logding 文字字体和样式
// wx.setBackgroundTextStyle({
//   textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
// })

// 动态设置窗口的背景色
// wx.setBackgroundColor({
//   backgroundColor:'red'
// })

var mediumItems = [
  {
    id: 1,
    des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544547095181&di=2b882e58326bf39eb534952d38dd0112&imgtype=0&src=http%3A%2F%2Fi-2.kuaila.com%2F2018%2F6%2F1%2F68db1b37-5e37-4f00-8b52-4b61ed6a672c.jpg',
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
    url: 'http://upfile.asqql.com/2009pasdfasdfic2009s305985-ts/2015-2/201521016593738620.gif',
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
    des: '维密现场直播进行时，大长腿超模身材有点好～',
    url: 'https://thumbnail10.baidupcs.com/thumbnail/8896cd3e3eafa89e168e5e503ed30911?fid=573652283-250528-71797931909030&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-Ut7ETlSboShzhvfestiT5ifiDmY%3d&expires=8h&chkbd=0&chkv=0&dp-logid=8020344468407171470&dp-callid=0&time=1544612400&size=c1440_u900&quality=90&vuk=573652283&ft=image&autopolicy=1',
    type: 'live',
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
    url: 'http://upyun.h800.com.cn/goods/1540447407958.jpg!/sq/1000',
    type: 'article',
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: '冯莫提',
      avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
    }
  },
  {
    id: 4,
    des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
    url: 'http://s9.rr.itc.cn/r/wapChange/20171_4_17/a69an5089831386763.gif',
    type: 'video',
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: '冯莫提',
      avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
    }
  },
  {
    id: 4,
    des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
    url: 'http://upyun.h800.com.cn/goods/1541063260891.jpg!/sq/1000',
    type: 'article',
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: '冯莫提',
      avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
    }
  },
  {
    id: 4,
    des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
    url: 'http://upyun.h800.com.cn/goods/1539940482333.jpg!/sq/1000',
    type: 'article',
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: '冯莫提',
      avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
    }
  },
  {
    id: 4,
    des: '网红健身小姐姐教你一个月Get蜜桃臀+马甲线',
    url: 'http://upyun.h800.com.cn/goods/1536222953019.jpg!/sq/1000',
    type: 'article',
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: '冯莫提',
      avatar: 'http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96'
    }
  }
]




console.log(numberFormat(276500))
Page({
  data: {
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
  RandomNum:function(a,b){return 3},
  playHandle: function () {
    console.log(this.data.isPlaying)
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //调用应用实例的方法获取全局数据

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor:'rgba(0,0,0,0)'
    })

    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    this.setData({
      userInfo: { ...this.data.userInfo, fans: numberFormat(276500) },
      tList: [
        { name: `作品 12`, page: 0 },
        { name: "动态 3", page: 0 },
        { name: "喜欢 6", page: 0 },
      ],
      list: [Array(12), Array(3), Array(6)],
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
  // onPullDownRefresh: function (e) {
  //   console.log("下拉", e)
  // },

  // onPullDownRefresh: function (e) {
  //   console.log(e)
  // },
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
