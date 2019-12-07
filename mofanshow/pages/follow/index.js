/* Follow page */

const followers = [
  {
    id: 1,
    des: "网红健身小姐姐教你一个月Get蜜桃臀+马甲线",
    url: "http://img0.imgtn.bdimg.com/it/u=2977791886,926984288&fm=26&gp=0.jpg",
    type: "article",
    likes: 298,
    videoValue: 1, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96"
    }
  },
  {
    id: 2,
    des:
      "卫衣+裙子|潮潮的眨眼图案灰色卫衣|仙仙的轻纱裙 对她就是要外穿的街拍罩裙|🌟",
    url:
      "http://img14.360buyimg.com/n1/s350x449_jfs/t21931/84/1699170795/520509/cfa38072/5b332043Na93fa370.jpg%21cc_350x449.jpg",
    type: "video",
    likes: 298,
    videoValue: 2, //关联视频的ID
    user: {
      name: "陈红",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/JoT0qV1feTWNKdhianPOwQ4BNBBAdEHhCBwvosdTtvCkJAdGaVXPz6kib9R4iah6s3ibRqsMTMzBwmicFicvUltbYMrw/132"
    }
  },
  {
    id: 3,
    des: "维密现场直播进行时，大长腿超模身材有点好～",
    url:
      "http://img11.360buyimg.com/n1/s350x449_jfs/t20221/362/1834399359/206594/b3ab4928/5b39c244Na9858b4b.jpg%21cc_350x449.jpg",
    type: "live",
    likes: 298,
    videoValue: 3, //关联视频的ID
    user: {
      name: "上官婉儿",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/sGRky9w7qh16vdOKg3aLhLJLEpPkVgfXD2XiafZH8Hx3zGK5zycNIh9HsIJ1AuNRS5Z1DiaK5DOsVUByBqQemylA40AXwW9v1BcmdFbKETiaE4/132"
    }
  },
  {
    id: 6,
    des: "网红健身小姐姐教你一个月Get蜜桃臀+马甲线",
    url:
      "http://pic3.58cdn.com.cn/zhuanzh/n_v20131d7e7ebc943aeb10d3bfe613dd932.jpg?w=750&h=0",
    type: "article",
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: "永远年轻",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/JoT0qV1feTWNKdhianPOwQ4BNBBAdEHhCBwvosdTtvCkJAdGaVXPz6kib9R4iah6s3ibRqsMTMzBwmicFicvUltbYMrw/132"
    }
  }
]
const posts = [
  {
    user: {
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96",
      name: "冯提莫"
    },
    summary: "2019大家要幸福哦",
    media: {

    },

  }
]

Page({
  data: {
    followers,
    recommand: followers
  }
})
