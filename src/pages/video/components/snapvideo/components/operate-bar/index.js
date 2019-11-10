Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {

  },

  data: {
    staredClazz: 'star-no'
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
    }
  }
})
