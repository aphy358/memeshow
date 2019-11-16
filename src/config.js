export default {
  api: {
    baseurl: "http://127.0.0.1:3000"
  },

  appId: "wx75473f7e3d5a9c63",

  theme: {
    tabs: {
      color: "#FED4D5",
      currentColor: "#FFFFFF",
      backgroundColor: "#FC4649"
    }
  },

  tabBar: {
    color: "#9f9f9f",
    selectedColor: "#3b3b3b",
    borderStyle: "white",
    custom: true,
    backgroundColor: "white",
    list: [
      {
        selectedIconPath: "/assets/images/background/home_black.png",
        iconPath: "/assets/images/background/home_gray.png",
        pagePath: "/pages/index/index",
        text: "首页"
      },
      {
        selectedIconPath: "/assets/images/background/focus_gray.png",
        iconPath: "/assets/images/background/focus_black.png",
        pagePath: "/pages/follow/index",
        text: "关注"
      },
      {
        selectedIconPath: "/assets/images/background/start.png",
        iconPath: "/assets/images/background/start.png",
        pagePath: "/pages/create/index",
        text: "开始创作"
      },
      {
        selectedIconPath: "/assets/images/background/msg_gray.png",
        iconPath: "/assets/images/background/msg_black.png",
        pagePath: "/pages/chat/index",
        text: "消息"
      },
      {
        selectedIconPath: "/assets/images/background/me_black.png",
        iconPath: "/assets/images/background/me_gray.png",
        pagePath: "/pages/my/index",
        text: "我的"
      }
    ]
  }
}
