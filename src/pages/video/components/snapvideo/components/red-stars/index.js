Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
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

      stars[0] = {
        style: `top: ${y}px;left: ${x}px;`,
        animation: {}
      }
      this.setData({ stars })

      stars[0].animation = wx.createAnimation({
        transformOrigin: '50% 50% 0',
        timingFunction: 'ease-out',
      })
        .translate('-50%', '-50%')
        .rotate(Math.random() * 34 - 17)
        .opacity(0)
        .step({
          delay: 0,
          duration: 10,
        })

        .scale(1.2)
        .opacity(1)
        .step({
          delay: 10,
          duration: 50,
        })

        .scale(.9)
        .step({
          delay: 50,
          duration: 100,
        })
        .step({
          delay: 0,
          duration: 0,
        })

        .scale(1)
        .step({
          delay: 20,
          duration: 50,
        })

        .opacity(0)
        .scale(3)
        .step({
          delay: 500,
          duration: 300,
        })

        .scale(1)
        .step({
          delay: 0,
          duration: 20,
        })
        .export()

      this.setData({ stars })
    },

    doubleTaped(e) {
      if (typeof e.detail !== 'undefined'){
        this.setData({ stars: [] })
        this.showStar(e)
      }
    }
  }
})
