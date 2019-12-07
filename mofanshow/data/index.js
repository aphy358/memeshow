//获取应用实例
export const categories = [
  { id: 1, name: "推荐" },
  { id: 2, name: "文章" },
  { id: 3, name: "快播视频" },
  { id: 4, name: "时尚达人" },
  { id: 5, name: "黑边蕾丝" },
  { id: 6, name: "彩妆" },
  { id: 7, name: "美食" },
  { id: 8, name: "古玩" },
  { id: 9, name: "服饰" },
  { id: 10, name: "饮品" },
  { id: 11, name: "白酒" },
  { id: 12, name: "茶叶" }
]

export var mediumItems = [
  {
    width: 1,
    height: 1,
    id: 1,
    des: "网红健身小姐姐教你一个月Get蜜桃臀+马甲线",
    url: "http://img1.imgtn.bdimg.com/it/u=1823520900,3478458563&fm=26&gp=0.jpg",
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
    width: 1,
    height: 1,
    id: 5,
    des:
      "渣渣Zayn Malik登上Fader雜誌封面及寫真大圖，美渣機車熟男風範盡顯，帥一臉！",
    url: "http://39.108.78.208:5105/imge/boy.jpg",
    videoUrl: "http://39.108.78.208:5105/video/boy.mp4",
    type: "video",
    likes: 298,
    videoValue: 2, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96"
    }
  },
  {
    width: 1,
    height: 1,
    id: 8,
    des: "潮男老炮儿聚集的机车俱乐部!",
    url:
      "http://img5.imgtn.bdimg.com/it/u=2595557303,2387800132&fm=26&gp=0.jpg",
    type: "article",
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96"
    }
  },
  {
    width: 1,
    height: 1,
    id: 10,
    des: "北欧风轻时尚系列",
    url: "http://39.108.78.208:5105/imge/man_1.jpg",
    type: "video",
    likes: 298,
    videoValue: 3, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96"
    }
  },
  {
    width: 1,
    height: 1,
    id: 7,
    des: "南宁一大帮美女又...",
    url:
      "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180109/cf38ac5e06de496ebf44fdf632c45b00.gif",
    type: "article",
    likes: 298,
    videoValue: 4, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/JtL8JiaA3qHx7WAvibt57Cpialu8Aiaw1mxmDWboP9icM7luMaqe6DBbvVMbicR2ymtWmF0D5bYkZw1GBXKqeswsueHkYnOYBPYvt6iacIS4HMicVLM/96"
    }
  },
  {
    width: 1,
    height: 1,
    id: 7,
    des:
      "卫衣+裙子|潮潮的眨眼图案灰色卫衣|仙仙的轻纱裙 对她就是要外穿的街拍罩裙|🌟",
    url: "http://39.108.78.208:5105/girl.gif",
    type: "video",
    likes: 298,
    videoValue: 1, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96"
    }
  },
  {
    width: 1,
    height: 1,
    id: 3,
    des: "维密现场直播进行时，大长腿超模身材有点好～",
    url: "http://39.108.78.208:5105/Victoria.gif",
    type: "live",
    likes: 298,
    videoValue: 3, //关联视频的ID
    user: {
      name: "冯莫提",
      avatar:
        "http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96"
    }
  }
]

export var articleItems = [
  {
    id: 0,
    des: "若我无处可去，投奔你可好",
    url:
      "http://static2.ivwen.com/users/14643455/bdf406d467e2486e90864a3081b2fb71.jpg?imageMogr2/crop/!1080.000000x672.000000a0.000000a371.000000",
    width: 357,
    height: 233.33,
    user: {
      name: "冯莫提",
      avatar:
        "http://static2.ivwen.com/users/14643455/bdf406d467e2486e90864a3081b2fb71.jpg?imageMogr2/crop/!1080.000000x672.000000a0.000000a371.000000"
    }
  },
  {
    id: 1,
    des: " 寻味重庆",
    url:
      "http://static2.ivwen.com/users/304536/ed0a8a016e004f369c4ee3482fc17ee5.jpg?imageMogr2/crop/!2560.0x1571.5555a0.0a122.666664",
    width: 357,
    height: 230.27,
    user: {
      name: "莫西子诗",
      avatar:
        "http://static2.ivwen.com/users/304536/ed0a8a016e004f369c4ee3482fc17ee5.jpg?imageMogr2/crop/!2560.0x1571.5555a0.0a122.666664"
    }
  },
  {
    id: 2,
    des: "神秘的女儿国，泸沽湖",
    url:
      "http://static2.ivwen.com/users/756326/1f70fc3ebd8041208818289616b0dbb5.jpg?imageMogr2/crop/!1799.9999x1125.0a0.0a0.0",
    width: 357,
    height: 234.38,
    user: {
      name: "旱塬清泉",
      avatar:
        "http://static2.ivwen.com/users/756326/1f70fc3ebd8041208818289616b0dbb5.jpg?imageMogr2/crop/!1799.9999x1125.0a0.0a0.0"
    }
  },
  {
    id: 3,
    des: "红尘很美，只因有你",
    url:
      "http://static2.ivwen.com/users/15624330/a67ef7d471e945cd90a91873c6c3eaeb.jpg?imageMogr2/crop/!587.7551x360.0a0.0a0.0",
    width: 357,
    height: 229.58,
    user: {
      name: "Lucy",
      avatar:
        "http://static2.ivwen.com/users/15624330/98c2bd25259844188d8bce212ad50ea5.jpg?meipian-raw/bucket/ivwen/key/dXNlcnMvMTU2MjQzMzAvOThjMmJkMjUyNTk4NDQxODhkOGJjZTIxMmFkNTBlYTUuanBn/sign/76a08f5d535b784783bcc7666bafb104"
    }
  },
  {
    id: 4,
    des: "一个诺言 ，一缕无尽的芬芳",
    url:
      "http://static2.ivwen.com/users/10500179/88dd6fd0b8434e5bbc8b38e33849f201.jpg",
    width: 357,
    height: 531.94,
    user: {
      name: "Lucy",
      avatar:
        "http://static2.ivwen.com/users/10500179/88dd6fd0b8434e5bbc8b38e33849f201.jpg"
    }
  },
  {
    id: 5,
    des: " 哪怕一个人也要去看的电影",
    url:
      "http://static2.ivwen.com/users/35359559/0f9e2dccaae646588b52ab03c00316c7.jpg?imageMogr2/crop/!716.7834507042254x448.18485915492954a110.875a3.123239436619718",
    width: 357,
    height: 234.3,
    user: {
      name: "至爱周星驰",
      avatar:
        "http://static2.ivwen.com/users/40799119/df458a9bdec04f73be912b0ba2be74d2.jpg-cover2"
    }
  }
]

export const homePageItems = [
  {
    url:
      "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080",
    width: 377,
    height: 451,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/5c3e51e4.jpg?w=720&h=960&x-oss-process=image/resize,w_1080",
    width: 720,
    height: 960,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/bef41e67.JPG?w=712&h=534&x-oss-process=image/resize,w_1080",
    width: 712,
    height: 534,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/642cb83c.jpeg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
    width: 1080,
    height: 1080,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://ci.xiaohongshu.com/9d5d58d0-7f91-5792-b8e3-25b13b5c1807?imageView2/2/w/400/q/50/format/jpg",
    width: 400,
    height: 400,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/589585c1.jpeg?x-oss-process=image/resize,w_1080",
    width: 828,
    height: 828,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/1c5bcbf1.JPG?w=977&h=1180&x-oss-process=image/resize,w_1080",
    width: 977,
    height: 1180,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080",
    width: 377,
    height: 451,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/5c3e51e4.jpg?w=720&h=960&x-oss-process=image/resize,w_1080",
    width: 720,
    height: 960
  },
  {
    url:
      "https://image.watsons.com.cn//upload/bef41e67.JPG?w=712&h=534&x-oss-process=image/resize,w_1080",
    width: 712,
    height: 534,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/642cb83c.jpeg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
    width: 1080,
    height: 1080
  },
  {
    url:
      "https://ci.xiaohongshu.com/9d5d58d0-7f91-5792-b8e3-25b13b5c1807?imageView2/2/w/400/q/50/format/jpg",
    width: 400,
    height: 400,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  },
  {
    url:
      "https://image.watsons.com.cn//upload/589585c1.jpeg?x-oss-process=image/resize,w_1080",
    width: 828,
    height: 828
  },
  {
    url:
      "https://image.watsons.com.cn//upload/1c5bcbf1.JPG?w=977&h=1180&x-oss-process=image/resize,w_1080",
    width: 977,
    height: 1180,
    desc:
      "一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍，一段关于本内容的介绍.",
    author: "邓黄棋"
  }
]
