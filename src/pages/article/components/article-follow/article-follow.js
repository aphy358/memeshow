
Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    // 评论数据源
    comments: {
      type: Array,
      value: []
    },
  },

  data: {
  },

  methods: {
  },

  lifetimes: {
    ready() {
    }
  }
})
