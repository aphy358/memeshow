Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    // 当前视频项是否被激活（是否被滑动到可视区）
    active: {
      type: Boolean,
      value: false,
      observer: "videoActive"
    },

    doubleTapPos: {
      type: Object,
      value: {},
      observer: "doubleTaped"
    },
  },

  data: {
    // 屏幕上闪现的点赞红心
    stars: [],
  },

  methods: {
    // 在屏幕上添加一个点赞红星
    showStar(e) {
      const { x, y } = e.detail
      let { stars } = this.data

      stars.push({
        wrapStyle: `top: ${y}px;left: ${x}px;transform: rotate(${Math.random() * 34 - 17}deg);`,
      })
      this.setData({ stars })
    },

    // 点击视频
    tapStar(e){
      this.showStar(e)
    },

    videoActive(isActive) {
      // 视频划出，清空红心
      if (!isActive) {
        this.setData({ stars: [] })
      }
    },

    doubleTaped(e) {
      if (typeof e.detail !== 'undefined'){
        this.setData({ stars: [] })
        this.showStar(e)
      }
    }
  }
})
