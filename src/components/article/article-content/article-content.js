
Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    // 文章内容
    article: {
      type: Object,
      value: {},
      // observer(newVal) {
      //   if (!this.data.initialized) return;
      // }
    },
  },

  data: {
    initialized: false
  },

  methods: {
    initialize(){
      this.data.initialized = true
    },
  },

  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
