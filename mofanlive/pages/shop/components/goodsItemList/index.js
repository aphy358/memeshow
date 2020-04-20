Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    isLoading: {
      type: Boolean,
      value: false
    },

    noMore: {
      type: Boolean,
      value: false
    },

    list: {
      type: Array,
      value: []
    },

    marginBottom: {
      type: String,
      value: ""
    },

    listStyle: {
      type: String,
      value: ""
    }
  },

  methods: {
    onClickProduct({ detail }) {
      this.triggerEvent("clickProduct", detail)
    }
  }
})
