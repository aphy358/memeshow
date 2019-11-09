import { animateTo } from '../common/utils'
import { indexOfStringify } from '@/libs/utils.js'
import HTouch from '@/libs/hTouch.js'
const touchHandle = new HTouch()

const TIMING_FUNCTION_ARRAY = ['linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end']

Component({
  data: {
    // 容器尺寸
    wrapSize: {
      width: 0,
      height: 0
    },

    // 元素尺寸
    elemSize: {
      width: 0,
      height: 0
    },

    // dom信息
    elements: [],

    // 指向第一个dom信息
    headElement: null,

    // 指向最后一个dom信息
    tailElement: null,

    // 指向当前激活的dom信息
    activeElement: null,

    // dom关联的数据
    elementData: {},

    // 是否正在动画中
    transforming: false,

    // 动画
    timingFunction: 'ease-out',

    // 是否初始化
    initialized: false,

    // 该变量用于标记当前 swiper 组件是否禁止 touch 事件，如果禁止掉了，则屏幕无法滚动
    // 在用到评论框的场景，我们希望在翻看评论的时候不会导致整个视频的滚动，则需要将 forbidSwipe 设置为 true
    forbidSwipe: false,

    // 屏幕滑动方向（horizonal/vertical），这个方向是在屏幕滑动一段距离之后定性的一个状态，要么就是上下滑动，要么就是左右滑动
    // 而我们这里的应用场景只允许上下滑动，所以当定性为左右滑动的时候，则不滑动屏幕
    swipeDirection: '',

    // 向子组件传递的 touch 事件对象
    touchEvent: null,
  },
  properties: {
    // 元素宽度
    elementWidth: {
      type: Number,
      value: 0
    },

    // 元素高度
    elementHeight: {
      type: Number,
      value: 0
    },

    // 列表数据
    items: {
      type: Array,
      value: [],
      observer(newVal) {
        if (!this.data.initialized) {
          return
        }
        if (!newVal || newVal.length === 0) {
          // 清除数据
          this.setData({ elementData: {} })
          return
        }

        const { elements, activeElement, elementData } = this.data
        const activeItemIdx = activeElement.id
        const activeDataIdx = indexOfStringify(newVal, elementData[activeItemIdx])
        const activeElementIdx = activeElement.index

        // 根据当前数据在新列表中的位置重置数据和dom的关联
        for (let i = 0, len = elements.length; i < len; ++i) {
          const elem = elements[i]
          const itemIdx = activeDataIdx + (elem.index - activeElementIdx)
          elementData[elem.id] = newVal[itemIdx] || null
        }

        this.setData({ elementData })
        // console.log(`reset items, new active item index is ${activeItemIdx} `, newVal)
      }
    },

    // 没有当前数据时，以列表中该位置的数据作为当前数据
    defaultItemIndex: {
      type: Number,
      value: 1
    },

    // 动画类型
    animationType: {
      type: String,
      value: 'ease-out',
      observer(newVal) {
        if (TIMING_FUNCTION_ARRAY.indexOf(newVal) >= 0) {
          this.setData({ timingFunction: newVal })
        }
      }
    },

    // 动画持续时间
    animationDuration: {
      type: Number,
      value: 300
    },

    // 是否为垂直翻页
    isVertical: {
      type: Boolean,
      value: true
    },

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
  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    touchcancel: touchHandle.touchcancel.bind(touchHandle),

    // 由子组件传递上来的事件，传递一个标识来控制当前组件是否可以执行 touch 事件
    preventSwipe(e){
      this.data.forbidSwipe = e.detail
    },

    registerTouchEvent() {
      touchHandle.listen('touchstart', e => this.onTouchStart(e))
      touchHandle.listen('touchmove', e => this.onTouchMove(e))
      touchHandle.listen('touchend', e => this.onTouchEnd(e))
      touchHandle.listen('touchcancel', e => this.onTouchCancel(e))
    },

    initialize() {
      const { elementWidth, elementHeight, isVertical, items, defaultItemIndex } = this.data

      wx.createSelectorQuery().in(this).select('.hswiper-wrap').boundingClientRect().exec(res => {
        // 尺寸
        const wrapSize = { width: res[0].width, height: res[0].height }
        const elemSize = {
          width: elementWidth || wrapSize.width,
          height: elementHeight || wrapSize.height
        }
        console.log('hswiper wrap size is ', wrapSize)
        console.log('hswiper elem size is ', elemSize)

        // 根据可见区域计算出需要的dom数量
        const totalSize = isVertical ? wrapSize.height : wrapSize.width
        const unitSize = isVertical ? elemSize.height : elemSize.width
        const elemCount = Math.ceil(totalSize / unitSize) + 2
        console.log(`hswiper elem count is ${elemCount}`)

        // 初始化dom信息
        const elements = []
        // 将中间的dom作为当前选中
        const activeElemIndex = Math.ceil(elemCount / 2) - 1
        const translateType = isVertical ? 'translateY' : 'translateX'
        for (let i = 0; i < elemCount; ++i) {
          const id = i;
          // 排列位置
          const index = i;
          // 基于wrap的实时偏移
          const offset = unitSize * (i - activeElemIndex)
          // 上次停留的偏移位置
          const prevOffset = offset
          // 初始时直接移动到所在位置
          const animation = animateTo({[translateType]: offset}, 0)
          elements.push({ id, index, prevOffset, offset, animation, active: offset === 0 })
          // console.log(`hswiper elem-${id} init index is ${index} offset is ${offset}`)
        }

        // dom指针
        const headElement = elements[0]
        const tailElement = elements[elemCount - 1]
        const activeElement = elements[activeElemIndex]

        // 初始化关联数据
        const elementData = {}
        for (let i = 0; i < elemCount; ++i) {
          const itemIdx = defaultItemIndex - (activeElemIndex - i)
          elementData[elements[i].id] = items[itemIdx] || null
        }

        console.log(`hswiper init items are `, items)
        console.log(`hswiper init element data are `, elementData)

        this.setData({
          wrapSize, elemSize, elements,
          headElement, tailElement, activeElement, elementData, initialized: true
        })

        this.triggerEvent('initialized')
      })
    },

    onTouchStart(e) {
      e.type = 'touchstart'
      this.setData({ touchEvent: e })
      this.data.swipeDirection = ''    // 恢复状态
    },

    onTouchEnd(e, eventType = 'touchend') {
      e.type = eventType
      this.setData({ touchEvent: e })

      if(this.data.forbidSwipe)  return

      const { isVertical, wrapSize, elements, headElement, tailElement, elementData, elemSize, items,
        animationDuration, timingFunction, swipeMinDuration, swipeMinDistance } = this.data
      const { distanceX, distanceY, duration } = e
      const translateType = isVertical ? 'translateY' : 'translateX'

      // 计算最终滑动方向
      if (this.data.swipeDirection === 'horizonal'){
        this.data.swipeDirection = ''    // 恢复状态
        if (eventType === 'touchend') return
      }
      
      let dir = this.swipeDirection(e)
      if (dir === '' && eventType === 'touchend') return
      if (dir === 'next' && !elementData[tailElement.id]) return
      if (dir === 'prev' && !elementData[headElement.id]) return

      // 滑动时间大于设定的阀值，我们视为正在拖动屏幕，这种情况下如果滑动距离不够，则回弹到原位置
      if (dir !== 'springback' && duration > swipeMinDuration && eventType === 'touchend') {
        const distance = isVertical ? distanceY : distanceX
        let minDistance = swipeMinDistance
        if (swipeMinDistance <= 1) {
          minDistance = ((isVertical ? wrapSize.height : wrapSize.width)) * swipeMinDistance
        }
        if (Math.abs(distance) < minDistance) {
          dir = 'springback'
        }
      }

      // 记录滑动开始和结束时，相对原位置的偏移量
      const startDelta = elements[0].offset - elements[0].prevOffset
      let endDelta

      if (eventType === 'touchcancel')  dir = 'springback'
      if (dir === 'springback') {
        // 回到原来位置
        endDelta = 0
        elements.forEach(elem => {
          elem.offset = elem.prevOffset
          elem.animation = animateTo({[translateType]: elem.offset})
        })
        this.setData({ elements, transforming: true })

      } else {
        // 之前dom指针
        const prevHeadElement = this.data.headElement
        const prevTailElement = this.data.tailElement
        const activeElementIdx = this.data.activeElement.index

        // 滑动到前一个/后一个
        const unitSize = isVertical ? elemSize.height : elemSize.width
        const delta = dir === 'next' ? -unitSize : unitSize
        endDelta = delta
        const elemCount = elements.length

        // 更新dom信息
        elements.forEach(elem => {
          // 更新位置索引
          let nextIndex = elem.index + (dir === 'next' ? -1 : 1)
          if (nextIndex === elemCount) nextIndex = 0
          if (nextIndex === -1) nextIndex = elemCount - 1

          // 滑动目标偏移
          const animateOffset = elem.prevOffset + delta

          // head/tail 移动形成循环
          let finalOffset = animateOffset
          if (dir === 'next' && nextIndex === elemCount - 1) {
            finalOffset = animateOffset + unitSize * elemCount
          }
          if (dir === 'prev' && nextIndex === 0) {
            finalOffset = animateOffset - unitSize * elemCount
          }

          elem.index = nextIndex
          elem.offset = finalOffset
          elem.prevOffset = finalOffset
          elem.animation = animateTo({[translateType]: animateOffset})
          elem.active = finalOffset === 0
        })

        // 新的dom指针
        const headElement = elements.find(elem => elem.index === 0)
        const tailElement = elements.find(elem => elem.index === elements.length - 1)
        const activeElement = elements.find(elem => elem.index === activeElementIdx)

        // 更新dom关联的数据
        if (dir === 'next') {
          const prevTailItem = elementData[prevTailElement.id]
          const prevTailItemIdx = items.indexOf(prevTailItem)
          if (prevTailItemIdx >= 0) {
            elementData[tailElement.id] = items[prevTailItemIdx + 1] || null
          } else {
            elementData[tailElement.id] = null
          }
        }
        if (dir === 'prev') {
          const prevHeadItem = elementData[prevHeadElement.id]
          const prevHeadItemIdx = items.indexOf(prevHeadItem)
          if (prevHeadItemIdx >= 1) {
            elementData[headElement.id] = items[prevHeadItemIdx - 1] || null
          } else {
            elementData[headElement.id] = null
          }
        }

        this.setData({ elements, headElement, tailElement, activeElement, elementData, transforming: true })

        // 通知滑动开始
        this.triggerEvent('beforeSwipe', {
          startDelta,
          endDelta,
          duration: animationDuration,
          timingFunction,
          direction: dir,
          isVertical
        })
        
        // 通知新的当前数据
        const activeItem = elementData[activeElement.id]
        const activeItemIdx = items.indexOf(activeItem)
        this.triggerEvent('activeItem', {
          index: activeItemIdx,
          item: activeItem
        })
      }

      // 滑动结束后，立即回到最终位置
      setTimeout(() => {
        const { elements } = this.data
        elements.forEach(elem => elem.animation = animateTo({[translateType]: elem.offset}, 0))
        this.setData({ elements, transforming: false })

        // console.log('hswiper after transforming the elements are:')
        // elements.forEach(elem => console.log(`\thswiper elem-${elem.id} init index is ${elem.index} offset is ${elem.offset}`))

        // 通知滑动结束
        this.triggerEvent('afterSwipe', {
          startDelta,
          endDelta,
          duration: animationDuration,
          timingFunction,
          direction: dir,
          isVertical
        })

      }, animationDuration)
    },

    onTouchCancel(e) {
      this.onTouchEnd(e, 'touchcancel')
    },

    onTouchMove(e) {
      e.type = 'touchmove'
      this.setData({ touchEvent: e })

      if(this.data.forbidSwipe)  return

      // 这里使用 lodash 的截流函数无效，只能在这里做一个限制
      if(this.throttle_onTouchMove && +new Date() - this.throttle_onTouchMove < 100){
        return
      }else{
        this.throttle_onTouchMove = +new Date()
      }

      const { elemSize, elements, headElement, tailElement, elementData, transforming, isVertical } = this.data
      const startPhase = isVertical ? 'startY' : 'startX'
      const endPhase = isVertical ? 'endY' : 'endX'
      const translateType = isVertical ? 'translateY' : 'translateX'

      // 动画时禁止移动
      if (transforming) {
        return
      }

      // 滑动方向上没有数据，禁止移动
      const dir = this.swipeDirection(e)
      if (dir === '' || this.data.swipeDirection === 'horizonal')  return

      if (dir === 'next' && !elementData[tailElement.id]) {
        this.triggerEvent('itemsExhausted', { direction: dir, isVertical })
        return
      }
      if (dir === 'prev' && !elementData[headElement.id]) {
        this.triggerEvent('itemsExhausted', { direction: dir, isVertical })
        return
      }

      // 跟随手指移动，并限制移动范围
      let delta = e[endPhase] - e[startPhase]
      const maxDistance = (isVertical ? elemSize.height : elemSize.width)
      if (Math.abs(delta) > maxDistance) return

      elements.forEach(elem => {
        elem.offset = elem.prevOffset + delta
        elem.animation = animateTo({[translateType]: elem.offset}, 0)
      });
      this.setData({ elements })

      // 激发移动事件
      this.triggerEvent('move', {
        direction: dir,
        delta,
        maxDistance
      })
    },

    swipeDirection(e) {
      let dir = ''
      const distance = this.data.isVertical ? e.distanceY : e.distanceX
      
      if(Math.abs(distance) < 20)   return dir
      
      if(
        (this.data.isVertical && Math.abs(e.distanceY) <= Math.abs(e.distanceX)) ||
        (!this.data.isVertical && Math.abs(e.distanceY) >= Math.abs(e.distanceX))
      ){
        if(this.data.swipeDirection !== 'vertical')  this.data.swipeDirection = 'horizonal'

        // 如果之前已经判定为可滑动，可是后来总的滑动轨迹又显示不同方向上滑动距离比屏幕实际滑动距离还长，
        // 这个时候让屏幕弹回去，而不能让屏幕卡在那
        if(this.data.swipeDirection === 'vertical')  dir = 'springback'
      }else{
        dir = distance > 0 ? 'prev' : 'next'
        if(this.data.swipeDirection !== 'horizonal') this.data.swipeDirection = 'vertical'
      }

      return dir
    },

  },
  lifetimes: {
    ready() {
      this.initialize()
      this.registerTouchEvent()
    }
  }
})
