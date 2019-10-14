
Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },

  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: [],
      observer(newVal) {
        if (!this.data.initialized) return;
      }
    },

    // 是否显示评论弹框
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    initialized: false
  },

  methods: {
    initialize(){
      this.data.initialized = true
    },

    // 通知上层显示评论输入框
    showCommentInputPopup(e){
      this.triggerEvent('showCommentInputPopup', e.detail)
    },

    // 通知上层关闭评论列表
    hideCommentPopup(){
      this.triggerEvent('hideCommentPopup')
    },

    // 通知上层切换点赞状态
    switchStarStatus(e){
      this.triggerEvent('switchStarStatus', e.detail)
    },
  },

  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
