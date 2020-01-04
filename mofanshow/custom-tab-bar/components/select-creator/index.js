import procedures from '@/pages/procedures/index'

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
      const instance = procedures.open('create-article')
      const emitter = instance.asCaller()
      emitter.on('complete', data => {
        // todo
      })
      this.hidePopup()
    },

    // 视频创作
    addVideo(e) {
      const instance = procedures.open('create-video')
      const emitter = instance.asCaller()
      emitter.on('complete', data => {
        // todo
      })
      this.hidePopup()
    },

    // 直播创作
    addLive(e) {

      this.hidePopup()
    }
  }
})
