Component({
  properties: {
    // 弹出层是否显示
    visible: {
      type: Boolean,
      value: false,
    },

    // 弹出层的方向
    direction: {
      type: String,
      value: 'bottom'
    },

    // 段落的类型 图片，文字，视频，商品...
    sectionTypes: {
      type: Array,
      value: [
        {
          name: 'picture',
          icon: '',
          title: '图片'
        },
        {
          name: 'text',
          icon: '',
          title: '文字'
        },
        {
          name: 'video',
          icon: '',
          title: '视频'
        },
        {
          name: 'product',
          icon: '',
          title: '商品'
        },
        {
          name: 'location',
          icon: '',
          title: '位置'
        },
        {
          name: 'vote',
          icon: '',
          title: '投票'
        },
        {
          name: 'assemble',
          icon: '',
          title: '拼图'
        },
      ]
    }
  },

  methods: {
    handleToggle() {
      this.triggerEvent('toggle')
    },
    handleTapItem(e) {
      const type = e.currentTarget.dataset.type
      this.triggerEvent('tapitem', type)
    }
  }
})