Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    doubleTapPos: {
      type: Object,
      value: {},
      observer: "doubleTaped"
    },
  },

  data: {
    staredClazz: 'star-no',

    // 是否正在直播
    onLive: true,
  },

  methods: {
    showCommentPopup() {
      this.triggerEvent('showCommentPopup')
    },

    starYes(e) {
      this.setData({ staredClazz: 'star-yes' })
    },

    starNo(e) {
      this.setData({ staredClazz: 'star-no' })
    },

    doubleTaped(e) {
      if (typeof e.detail !== 'undefined'){
        this.setData({ staredClazz: 'star-yes' })
      }
    }
  }
})
