import { connect } from "libs/redux/index.js"
import { animateTo } from 'libs/utils.js'
import { safeArea } from "ui-kit/behaviors/safeArea"

import HTouch from 'libs/hTouch.js'
const touchHandle = new HTouch()

const app = getApp()
const store = app.store

let componentConfig = {
  behaviors: [safeArea()],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 滑动时间阀值，少于该阀值直接翻页，大于该值，则根据滑动距离判断是回弹到原位置还是翻页
    swipeMinDuration: {
      type: Number,
      value: 300
    },

    // 滑动最短距离，小于该距离回弹到原位置，默认为容器尺寸30%，<=1时表示占容器尺寸的比例，>1时表示绝对像素值
    swipeMinDistance: {
      type: Number,
      value: 0.45
    }
  },

  data: {
    // 是否正在动画中
    transforming: false,

    // 屏幕滑动方向（horizonal/vertical），这个方向是在屏幕滑动一段距离之后定性的一个状态，要么就是上下滑动，要么就是左右滑动
    // 而我们这里的应用场景只允许左右滑动，所以当定性为上下滑动的时候，则不滑动屏幕
    swipeDirection: '',
    
    swipeCover: {
      animation: null,

      // 水平方向的偏移量
      offset: 0,

      prevOffset: 0,
    }

  },

  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    touchcancel: touchHandle.touchcancel.bind(touchHandle),

    registerTouchEvent() {
      this.data.listenerId1 = touchHandle.listen('touchstart', e => this.onTouchStart(e))
      this.data.listenerId2 = touchHandle.listen('touchmove', e => this.onTouchMove(e))
      this.data.listenerId3 = touchHandle.listen('touchend', e => this.onTouchEnd(e))
      this.data.listenerId4 = touchHandle.listen('touchcancel', e => this.onTouchCancel(e))
    },

    removeListeners() {
      touchHandle.removeListener(this.data.listenerId1)
      touchHandle.removeListener(this.data.listenerId2)
      touchHandle.removeListener(this.data.listenerId3)
      touchHandle.removeListener(this.data.listenerId4)
    },

    onTouchStart(e) {
      this.data.swipeDirection = ''    // 恢复状态
    },

    onTouchEnd(e, eventType = 'touchend') {
      const { safeArea, swipeMinDuration, swipeMinDistance } = this.data
      let { swipeCover } = this.data
      const { distanceX, duration } = e
      
      let dir = this.swipeDirection(e)
      if (this.data.swipeDirection === 'vertical'){
        this.data.swipeDirection = ''    // 恢复状态
        if (eventType === 'touchend') return
      }
      if (dir === '' && eventType === 'touchend') return  // 如果此时 eventType === 'touchcancel'，则需要将弹层弹回去
      if (dir === 'left' && swipeCover.offset < -safeArea.width) return
      if (dir === 'right' && swipeCover.offset > safeArea.width) return

      // 滑动时间大于设定的阀值，我们视为正在拖动屏幕，这种情况下如果滑动距离不够，则回弹到原位置
      if (dir !== 'springback' && duration > swipeMinDuration && eventType === 'touchend') {
        let minDistance = swipeMinDistance
        if (swipeMinDistance <= 1) minDistance = safeArea.width * swipeMinDistance
        if (Math.abs(distanceX) < minDistance) dir = 'springback'
      }

      if (eventType === 'touchcancel')  dir = 'springback'

      if (dir === 'springback') {
        swipeCover.offset = swipeCover.prevOffset
        swipeCover.animation = animateTo({'translateX': swipeCover.prevOffset})
        this.setData({ swipeCover, transforming: true })

      } else {
        let animateOffset = 0

        // 更新dom关联的数据
        if (dir === 'left') {
          animateOffset = swipeCover.prevOffset - safeArea.width
        }

        if (dir === 'right') {
          animateOffset = swipeCover.prevOffset + safeArea.width
        }

        swipeCover.offset = animateOffset
        swipeCover.prevOffset = animateOffset
        swipeCover.animation = animateTo({'translateX': animateOffset})

        this.setData({ swipeCover, transforming: true })
      }

      // 滑动结束后，立即回到最终位置
      setTimeout(() => {
        this.setData({ transforming: false })
      }, 300)

    },

    onTouchCancel(e) {
      this.onTouchEnd(e, 'touchcancel')
    },

    onTouchMove(e) {
      let { safeArea, swipeCover } = this.data

      // 动画时禁止移动
      if (this.data.transforming) return;
      if (Math.abs(e.distanceX) > safeArea.width) return

      const dir = this.swipeDirection(e)
      // 如果此前还未对滑动方向定性，或者已经定性为垂直方向滑动，则不滑动
      if (dir === '' || this.data.swipeDirection === 'vertical') return
      if (dir === 'left' && swipeCover.offset < -safeArea.width) return
      if (dir === 'right' && swipeCover.offset > safeArea.width) return

      swipeCover.offset = swipeCover.prevOffset + e.distanceX
      swipeCover.animation = animateTo({'translateX': swipeCover.offset}, 0)
      this.setData({ swipeCover })
    },

    swipeDirection(e) {
      let dir = ''
      const distance = e.distanceX

      if (Math.abs(distance) < 20) return dir

      if (Math.abs(e.distanceY) >= Math.abs(e.distanceX)) {
        // 如果此前还未对滑动方向定性，则定性为垂直方向
        if (this.data.swipeDirection === '') this.data.swipeDirection = 'vertical'

        // 如果之前已经判定为可滑动，可是后来总的滑动轨迹又显示不同方向上滑动距离比屏幕实际滑动距离还长，
        // 这个时候让屏幕弹回去，而不能让屏幕卡在那
        if (this.data.swipeDirection === 'horizonal') dir = 'springback'
        
      } else {
        dir = distance > 0 ? 'right' : 'left'

        // 如果此前已经被定性为垂直滑动，则不再定性为水平滑动
        if (this.data.swipeDirection !== 'vertical') this.data.swipeDirection = 'horizonal'
      }

      return dir
    },

  },

  lifetimes: {
    ready() {
      this.registerTouchEvent()
    },
    detached() {
      this.removeListeners()
    },
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)