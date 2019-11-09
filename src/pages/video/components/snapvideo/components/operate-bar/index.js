Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {

  },

  data: {

  },

  methods: {
    showCommentPopup() {
      this.triggerEvent('showCommentPopup')
    }
  }
})
