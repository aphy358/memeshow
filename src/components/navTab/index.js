const app = getApp()
Component({
  externalClasses: ['iconStyle', 'titleStyle'],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerTitle: {
      type: String,
      value: ''
    },
    isShowBack: {
      type: String,
      value: "true"
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {
      statusBarHeight: app.globalData.statusBarHeight,
      titleBarHeight: app.globalData.titleBarHeight
    }
  },
  methods: {
    // 这里是一个自定义方法
    goback: function () {
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
