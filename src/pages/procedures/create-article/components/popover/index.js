const nextTick = (piece = 100) => new Promise(resolve => setTimeout(resolve, piece))

Component({
  properties: {
    // 弹出层是否显示
    visible: {
      type: Boolean,
      value: false,
      observer: "observerVisible"
    },

    // 弹出层的目标框框
    rect: {
      type: Object,
      value: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
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

  data: {
    classes: "popover__hidden-none popover__hidden",

    // 弹出的锚点
    x: 0, y: 0,

    // 弹出层的方位 ['bottom', 'top']
    placement: 'bottom',

    showCount: 4
  },

  methods: {
    /**
     * 监听 visible
     * @param {boolean} visible 
     */
    observerVisible(visible) {
      const wh = wx.getSystemInfoSync().windowHeight
      if (visible) {
        wh - 140 > this.data.rect.bottom ? this.show('bottom') : this.show('top')
      } else {
        this.hide()
      }
    },

    /**
     * 展示
     */
    show(placement) {
      Promise.resolve()
        .then(() => {
          return new Promise(resolve => {
            this.setData({
              y: this.data.rect[placement],
              x: (this.data.rect.left + this.data.rect.right) / 2,
              placement
            }, resolve)
          })
        })
        .then(nextTick)
        .then(() => {
          return new Promise(resolve => {
            this.setData({
              classes: `popover__shown-${placement}-middle`
            }, resolve)
          })
        })
        .then(nextTick(160))
        .then(() => {
          this.setData({
            classes: `popover__shown-${placement}`
          })
        })
    },

    /**
     * 隐藏
     */
    hide() {
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          return new Promise(resolve => {
            this.setData({
              classes: 'popover__hidden'
            }, resolve)
          })
        })
        .then(nextTick)
        .then(() => {
          this.setData({
            classes: 'popover__hidden popover__hidden-none'
          })
        })
    },

    handleTapItem(e) {
      const type = e.currentTarget.dataset.type
      this.triggerEvent('tapitem', type)
    },

    toggleShowMore() {
      this.setData({
        showCount: 12 - this.data.showCount
      })
    }
  }
})