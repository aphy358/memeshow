// Home Page

import { categories, homePageItems, mediumItems } from "../../../data"
// @todo connect reducer
import { connect } from "../../libs/redux/index.js"

// const app = getApp()
// let store = app.store
// let pageConfig =
// let mapStateToData = state => {
//   return { testData: state.testData || store.getState().testData }
// }
// const mapDispatchToPage = dispatch => ({})
// let connectedPageConfig = connect(
//   mapStateToData,
//   mapDispatchToPage
// )(pageConfig)

Page({
  data: {
    // 相关频道下的长列表
    list: [],

    // 频道分类
    categories: [],

    // 直播列表
    liveList: [
      {
        roomid: "123",
        user: {
          id: "123",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name: "今晚打老虎"
        }
      },
      {
        roomid: "1234",
        user: {
          id: "1234",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name:
            "今晚打老虎今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老"
        }
      },
      {
        roomid: "123",
        user: {
          id: "123",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name: "今晚打老虎"
        }
      },
      {
        roomid: "1234",
        user: {
          id: "1234",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name:
            "今晚打老虎今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老"
        }
      },
      {
        roomid: "123",
        user: {
          id: "123",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name: "今晚打老虎"
        }
      },
      {
        roomid: "1234",
        user: {
          id: "1234",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name:
            "今晚打老虎今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老"
        }
      },
      {
        roomid: "123",
        user: {
          id: "123",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name: "今晚打老虎"
        }
      },
      {
        roomid: "1234",
        user: {
          id: "1234",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name:
            "今晚打老虎今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老"
        }
      },
      {
        roomid: "123",
        user: {
          id: "123",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name: "今晚打老虎"
        }
      },
      {
        roomid: "1234",
        user: {
          id: "1234",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name:
            "今晚打老虎今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老"
        }
      },
      {
        roomid: "123",
        user: {
          id: "123",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name: "今晚打老虎"
        }
      },
      {
        roomid: "1234",
        user: {
          id: "1234",
          avatar:
            "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
          name:
            "今晚打老虎今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老今晚打老"
        }
      }
    ],

    // 轮播图促销列表
    promos: [
      {
        id: 12,
        url: "",
        image: "//img.alicdn.com/simba/img/TB1bH3imXT7gK0jSZFpSuuTkpXa.jpg"
      },
      {
        id: 123,
        url: "",
        image:
          "//img.alicdn.com/tfs/TB1HrtNmp67gK0jSZPfXXahhFXa-520-280.jpg_q90_.webp"
      }
    ],

    tabs: {
      sticky: false,
      offset: 0
    },

    hots: [
      {
        url: "https://avatars3.githubusercontent.com/u/25254?s=460&v=4"
      },
      {
        url: "https://avatars2.githubusercontent.com/u/24228255?s=460&v=4"
      },
      {
        url: "https://avatars1.githubusercontent.com/u/150330?s=460&v=4"
      },
      {
        url: "https://avatars1.githubusercontent.com/u/810438?s=460&v=4"
      }
    ],

    animations: [
      "transform: translateX(0);z-index:1;opacity: 1;",
      "transform: translateX(50%);z-index:2;",
      "transform: translateX(100%);z-index:3;",
      "@keyframe reset { frome { transform: translateX(100%);z-index:3; } 50% { transform: translateX(100%);z-index:3;display:none; } to { transform: translateX(0);opacity: 0.6;z-index:0;display:block } };animation-name: reset;animation-delay: 0; animation-duration: 2s;animation-fill-mode: forwards;"
    ]
  },

  /**
   * lifeTime init
   */

  onLoad(options) {
    this.initCategories()
    this.fetchList()
    this.initTabs()
  },

  /**
   * lifeTime Ready
   */

  onReady() {
    this._timer = setInterval(() => {
      this.setData({
        animations: this.whirlAnimations(this.data.animations)
      })
    }, 2000)
  },

  /**
   * lifeTime Unload
   *
   * 注销 observer
   */

  onUnload() {
    this._observer.disconnect()
  },

  /**
   * 加载图片
   */

  onReachBottom() {
    this.fetchList()
  },

  /**
   * Init category
   */

  initCategories() {
    this.setData({ categories })
  },

  /**
   * Get List
   */

  fetchList() {
    this.setData({ list: mediumItems })
  },

  /**
   * 初始化频道 `tabs`
   * 吸附
   */

  initTabs() {
    this._observer = wx.createIntersectionObserver()
    this._observer
      .relativeTo(".home-page_channel-list")
      .observe(".home-page_header", res => {
        this.setData({
          tabs: {
            sticky: !this.data.tabs.sticky,
            offset: res.boundingClientRect.bottom
          }
        })
      })
  },

  whirlAnimations(list) {
    list.push(list.shift())
    return list
  }
})
