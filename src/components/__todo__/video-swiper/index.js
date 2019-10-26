// components/video_swipe/index.js

let circleItems = []
let start;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bufferSize: { type: Number, value: 3 }
  },

  /**
   * 组件的初始数据
   */
  data: {
    circular: true,
    curListIndex: 0,
    bufferItems: [],
    items: [],
    direction: 1
  },
  ready: function() {
    const bufferItems = new Array()
    for(let i=0;i < this.data.bufferSize;++i) {
      bufferItems.push({ autoplay: false, controls: false })
    }

    this.triggerEvent('loadmore', this.onLoadMore.bind(this))

    console.log("onReady: ", bufferItems, this.data.bufferSize)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function(e) {
      let curListIndex = this.data.curListIndex
      if (this.data.direction > 0) curListIndex++
      else curListIndex--

      console.log("切换swiper-item: ", this.data.direction, curListIndex)


      this.setData({
        curListIndex: curListIndex
      })

      this.triggerEvent('loadmore', this.onLoadMore.bind(this))
    },
    catchTouchMove: function() {
      const r = this.data.curListIndex < circleItems.length 
      console.log("catchTouchMove: ", r)
      return r
    },
    bindItems: function() {
      const bufferSize = this.data.bufferSize
      const curViewIndex = this.data.curListIndex % bufferSize
      console.log(`视图游标: ${curViewIndex}, 数据游标: ${this.data.curListIndex}, 视图缓冲: ${bufferSize}, 数据: ${circleItems.length}`)
      const bufferItems = new Array(bufferSize)

      if (this.data.curListIndex == circleItems.length - 1) {
        this.setData({ circuler: false })
        console.log('不可以循环')
        return
      }

      if (this.data.curListIndex == 0) {
        this.setData({ circuler: false })
      } else {
        console.log('可以循环')
        this.setData({ circuler: true })
      }

      for (var i = 0; i < bufferSize; i++) {
        var k = this.data.curListIndex - curViewIndex + i
        if (k < circleItems.length) {
          console.log(`缓冲中间 && 数据中间 => ${i}, ${k}`)
          bufferItems[i] = circleItems[k]
        } else {
          console.log(`缓冲中间 && 数据中间 => ${i}, ${k} no data`)
          bufferItems[i] = {}
        }
      }

      if (curViewIndex == bufferSize - 1) {
        console.log(`缓冲末尾${bufferSize - 1} && 数据中间${this.data.bufferSize} => 预置元素0, 可以循环`)
        bufferItems[0] = circleItems[this.data.curListIndex + 1]
      } else if (curViewIndex == 0) {
        if (this.data.curListIndex > 0) {
          console.log(`缓冲开始 && 数据中间 => 预置末尾元素${this.data.curListIndex - 1}, 可以循环`)
          bufferItems[bufferSize - 1] = circleItems[this.data.curListIndex - 1]
        }
      }

      
      bufferItems.forEach((it, i) => {
        console.log('it: ', i, curViewIndex, it.id)
        it.id = parseInt(Math.random() * 100000)
        it.autoplay = curViewIndex == i
        it.controls = false //curViewIndex == i
        if (it.autoplay) {
          console.log('自动播放: ', i, curViewIndex, this.data.curListIndex)
        }
      })
      
    
      this.setData({
        bufferItems: bufferItems
      })
      
      /*this.data.bufferItems.forEach((it, index) => {
        const vid = 'v-' + index
        const videoContext = wx.createVideoContext(vid)
        console.log('videoContext: ', vid, videoContext)
        if (it.autoplay) {
          console.log('自动播放a: ', index, curViewIndex, this.data.curListIndex)
          videoContext.play()
        } else {
          videoContext.pause()
        }
      })
      */
    },
    onLoadMore(items) {
      circleItems = circleItems.concat(items)
      console.log('onLoadMore: ', items, circleItems)

      this.bindItems()
    },
    // 下面主要模仿滑动事件
    touchstart: function (e) {
      start = e.changedTouches[0];
      // console.log("touchstart ", e.changedTouches[0])
    },

    touchmove: function (e) {
      // console.log("touchmove ", e.changedTouches[0])
    },

    touchend: function (e) {
      // console.log("touchend ", e.changedTouches[0])
      this.getDirect(start, e.changedTouches[0]);
    },

    touchcancel: function (e) {
      // console.log("touchcancel ", e.changedTouches[0])
      this.getDirect(start, e.changedTouches[0]);
    },

    // 计算滑动方向
    getDirect(start, end) {
      var X = end.pageX - start.pageX,
        Y = end.pageY - start.pageY;
      if (Math.abs(X) > Math.abs(Y) && X > 0) {
        console.log("left 2 right");
      }
      else if (Math.abs(X) > Math.abs(Y) && X < 0) {
        console.log("right 2 left");
      }
      else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        wx.showToast({
          title: '向上滑动',
        })
        console.log("top 2 bottom");
        this.setData({ direction: -1 })
      }
      else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        wx.showToast({
          title: '上下滑动，fuck',
        })
        console.log("bottom 2 top");
        this.setData({ direction: 1 })
      }
    }
  }
})
