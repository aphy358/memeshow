Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },
  
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: 'togglePop'
    },
  },

  data: {

  },

  methods: {
    // 切换 popup 的显示
    togglePop(val) {

    },

    hidePopup(e) {
      this.triggerEvent('hidePopup')
    },

    // 文章创作
    addArticle(e) {

      this.hidePopup()
    },

    // 视频创作
    addVideo(e) {

      this.hidePopup()
    },
    
    // 直播创作
    addLive(e) {

      this.hidePopup()
    }
  }
})
