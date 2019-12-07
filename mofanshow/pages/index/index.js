// Home Page

// @todo connect reducer
import { connect } from "libs/redux/index.js"
import { categories, homePageItems, mediumItems } from "../../data"

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

/** Mock data */
const liveList = {
  banner: {},
  list: [
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
  ]
}
const liveHots = [
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
]
const bannerList = [
  {
    id: 12,
    url: "",
    image: "https://img.alicdn.com/simba/img/TB15tI_mQL0gK0jSZFASuwA9pXa.jpg"
  },
  {
    id: 123,
    url: "",
    image: "//img.alicdn.com/tps/i4/TB1QBRimV67gK0jSZPfSuuhhFXa.jpg_q90_.webp"
  },
  {
    id: 123,
    url: "",
    image:
      "//img20.360buyimg.com/pop/s1180x940_jfs/t1/40050/35/14704/77632/5d5a71aaE6b64c0fc/e5051d0b88804947.jpg.webp"
  },
  {
    id: 123,
    url: "",
    image:
      "//img10.360buyimg.com/da/s1180x940_jfs/t1/56949/23/7582/71062/5d54e58cE7c286106/a3668688e07fae50.jpg.webp"
  }
]
const articleList = [
  {
    title: "若我无处可去，投奔你可好？",
    summary:
      "猫不怕水，只是怕被猫毛变湿后行动不便。猫毛不是像有些动物一样不沾水的，猫毛很吸水。一只野猫全身是水会容易生病。而且裹上泥再舔掉也相当不舒服。所以猫尽量不把自己弄水里。但是如果水里有鱼，牺牲一下爪子的湿，应该没问题。毕竟猫不是钻到水里抓鱼，而是在岸上等机会。",
    postInfo: {
      author: {
        id: "1233",
        name: "夏目",
        avatar:
          "https://pic1.zhimg.com/v2-8bca02f81a0ef7c01e1cb062d473027d_xl.jpg"
      },
      statistics: [
        {
          id: "123",
          number: 12345,
          title: "阅读"
        },
        {
          id: "12355",
          number: 53135,
          title: "喜欢"
        }
      ]
    }
  },{
    title: "若我无处可去，投奔你可好？",
    summary:
      "猫不怕水，只是怕被猫毛变湿后行动不便。猫毛不是像有些动物一样不沾水的，猫毛很吸水。一只野猫全身是水会容易生病。而且裹上泥再舔掉也相当不舒服。所以猫尽量不把自己弄水里。但是如果水里有鱼，牺牲一下爪子的湿，应该没问题。毕竟猫不是钻到水里抓鱼，而是在岸上等机会。",
    postInfo: {
      author: {
        id: "1233",
        name: "夏目",
        avatar:
          "https://pic1.zhimg.com/v2-8bca02f81a0ef7c01e1cb062d473027d_xl.jpg"
      },
      statistics: [
        {
          id: "123",
          number: 12345,
          title: "阅读"
        },
        {
          id: "12355",
          number: 53135,
          title: "喜欢"
        }
      ]
    }
  },{
    title: "若我无处可去，投奔你可好？",
    summary:
      "猫不怕水，只是怕被猫毛变湿后行动不便。猫毛不是像有些动物一样不沾水的，猫毛很吸水。一只野猫全身是水会容易生病。而且裹上泥再舔掉也相当不舒服。所以猫尽量不把自己弄水里。但是如果水里有鱼，牺牲一下爪子的湿，应该没问题。毕竟猫不是钻到水里抓鱼，而是在岸上等机会。",
    postInfo: {
      author: {
        id: "1233",
        name: "夏目",
        avatar:
          "https://pic1.zhimg.com/v2-8bca02f81a0ef7c01e1cb062d473027d_xl.jpg"
      },
      statistics: [
        {
          id: "123",
          number: 12345,
          title: "阅读"
        },
        {
          id: "12355",
          number: 53135,
          title: "喜欢"
        }
      ]
    }
  },{
    title: "若我无处可去，投奔你可好？",
    summary:
      "猫不怕水，只是怕被猫毛变湿后行动不便。猫毛不是像有些动物一样不沾水的，猫毛很吸水。一只野猫全身是水会容易生病。而且裹上泥再舔掉也相当不舒服。所以猫尽量不把自己弄水里。但是如果水里有鱼，牺牲一下爪子的湿，应该没问题。毕竟猫不是钻到水里抓鱼，而是在岸上等机会。",
    postInfo: {
      author: {
        id: "1233",
        name: "夏目",
        avatar:
          "https://pic1.zhimg.com/v2-8bca02f81a0ef7c01e1cb062d473027d_xl.jpg"
      },
      statistics: [
        {
          id: "123",
          number: 12345,
          title: "阅读"
        },
        {
          id: "12355",
          number: 53135,
          title: "喜欢"
        }
      ]
    }
  }
]

Page({
  data: {
    // 相关频道下的长列表
    list: [],

    // 列表的状态
    listState: {
      cursor: "",
      hasmore: true,
      waterfall: true
    },

    // 直播列表
    liveList,

    // 直播列表中的入口头像
    liveHots,

    // 轮播图促销列表
    bannerList,

    // 频道分类
    categories: [],

    // 直播列表
    liveListTemp: [
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

    tabs: {
      sticky: false,
      offset: 0
    },

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
  },

  onRedirect2Guide() {
    wx.navigateTo({
      url: "/pages/guide-components/index"
    })
  },

  onChangeChannel() {

  }
})
