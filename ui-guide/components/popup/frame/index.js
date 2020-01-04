Component({
  properties: {
    // Frame 的标示，required
    key: {
      type: String,
      optionalTypes: [String, Number]
    },

    // 点击蒙层是否允许关闭
    maskClosable: {
      type: Boolean,
      value: true
    },

    // 是否显示右上角关闭按钮
    closable: {
      type: Boolean,
      value: false
    },

    // 动画的持续时间，单位 ms
    duration: {
      type: Number,
      value: 500
    },

    title: {
      type: String,
      value: ""
    },

    // 自定义 content 区域的样式
    contentStyle: {
      type: String,
      value: ""
    }
  },

  data: {
    open: false
  },

  relations: {
    "../provider/index": {
      type: "parent"
    }
  },

  methods: {
    open() {
      this.setData({ open: true })
    }
  },

  options: {
    multipleSlots: true
  }
})
