import {parseStyle, styleStringify} from './libs/utils'
import HTouch from './libs/hTouch'
const touchHandle = new HTouch()

// 获取屏幕宽高
const systemInfo = wx.getSystemInfoSync()
const SCREEN_WIDTH = systemInfo.screenWidth
const SCREEN_HEIGHT = systemInfo.screenHeight

// 动画过渡时间
let DURATION = 300
let TIMEING_FUNCTION = 'ease-out'
const TIMEING_FUNCTION_ARRAY = ['linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end']


Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['wrap-container'],
  data: {
    // 每个元素的宽度
    itemWidth: SCREEN_WIDTH,
    // 每个元素的高度
    itemHeight: SCREEN_HEIGHT,
    wrapperStyle: '',
    itemStyle: '',
    // 当前显示的数据所在数组的下标
    nowViewDataIndex: 1,
    // 记录所有 item 当前的位移
    transPositionArr: [],
    // 记录所有 item 当前的位移的备份
    transPositionStoreArr: [],
    // 所有可视区 item 数据
    visibleDataList: [],
    // 所有 item 的动画实例
    itemAnimations: [],
    // 最外层可视区域盒子的样式
    viewBoxStyle: '',
    // 是否过渡中
    tranforming: false,
    // 上翻还是下翻，prev：上翻/前翻，  next：下翻/后翻， springback：回弹
    viewDirection: 'next',
    // 表示页面中数组处于哪个下标的item值将会更新
    dataWillUpdateAt: -1,
    // 'resolved'表示数据已经加载完成、'pending'表示正在加载
    // prev 和 next 分别表示向前/向后（或向上/向下）滑动的两个方向
    newDataListStatus: {
      prev: 'resolved',
      next: 'resolved'
    }
  },
  properties: {
    // 传入的数据
    dataList: {
      type: Array,
      value: [],
      observer(newVal) {
        if(newVal.length > 0){
          this.initVisibleDOM()
        }else{
          if(this.data.visibleDataList.length){
            console.warn('dataList不能为空')
          }
        }
      }
    },
    // 动态加载的新数据
    newDataList: {
      type: Array,
      value: [],
      observer(newVal) {
        if(newVal.length > 0){
          let {visibleDataList, dataList, dataWillUpdateAt, viewDirection} = this.data
          visibleDataList.splice(dataWillUpdateAt, 1, ...newVal)
          dataList.splice(dataWillUpdateAt, 1, ...newVal)

          this.data.dataList = dataList
          this.data.newDataListStatus[viewDirection] = 'resolved'
          this.setData({
            visibleDataList: visibleDataList
          })
        }
      }
    },
    // 动画类型
    animationType: {
      type: String,
      value: 'ease-out',
      observer(newVal) {
        if (TIMEING_FUNCTION_ARRAY.indexOf(newVal) < 0) {
          return
        }
        TIMEING_FUNCTION = newVal
      }
    },
    // 动画持续时间
    animationDuration: {
      type: Number,
      value: 300,
      observer(newVal) {
        DURATION = newVal
      }
    },
    // 模版名称
    templateName: {
      type: String,
      value: 'hSwiperItem'
    },
    // 初始显示第几屏的数据，默认第二屏
    initIndex: {
      type: Number,
      value: 1,
      observer(newVal) {
        if (!this.data.dataList.length) {
          return
        }
        let maxIndex = this.data.dataList.length - 1

        let val = newVal > maxIndex ? maxIndex : newVal
        val = val < 0 ? 0 : newVal
        this.setData({
          nowViewDataIndex: val
        })
      }
    },
    // 是否为垂直翻页
    isVertical: {
      type: Boolean,
      value: true
    },
  },
  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    // 注册屏幕滑动事件
    registerTouchEvent() {
      let {isVertical} = this.data
      let type = 'x'
      let endPhase = 'endX'
      let startPhase = 'startX'
      let translateType = 'translateX'

      if(isVertical){
        type = 'y'
        endPhase = 'endY'
        startPhase = 'startY'
        translateType = 'translateY'
      }

      touchHandle.listen('touchend', (e) => {
        let {distanceX, distanceY, duration} = e
        let _direction = this.getViewDirection(e)

        this.data.viewDirection = _direction

        // 如果手指在屏幕上滑动的时间超过300ms，且滑动的距离小于屏幕的半个高度（vertival的情况下），
        // 或小于屏幕的半个宽度（横向滚动的情况下），则将屏幕弹回原来展示的那个item位置
        if(isVertical){
          if(duration > 300 && Math.abs(distanceY) * 2 < SCREEN_HEIGHT) this.data.viewDirection = 'springback'
        }else{
          if(duration > 300 && Math.abs(distanceX) * 2 < SCREEN_WIDTH) this.data.viewDirection = 'springback'
        }

        // 如果当前屏幕滑动的方向所要加载的数据已经加载完成了，则允许屏幕向这个方向翻页
        if(this.data.newDataListStatus[_direction] === 'resolved'){
          this.moveViewToAdapter(true)

          // 当屏幕向一个方向翻页的时候，则将相反的那个方向的数据加载态设置为已经完成加载
          let direction = this.data.viewDirection === 'next' ? 'prev' : 'next'
          this.data.newDataListStatus[direction] = 'resolved'
        }
      })

      touchHandle.listen('touchmove', (data) => {
        let {newDataListStatus, nowViewDataIndex, tranforming, isVertical} = this.data
        let tmpDirection = this.getViewDirection(data)
        
        // 翻页过渡中或者下个页面的数据未加载完成则禁止手指滑动
        if (tranforming || newDataListStatus[tmpDirection] === 'pending') {
          return
        }
        
        this.triggerEvent('move', {
          index: nowViewDataIndex,
          nativeEvent: data,
          isVertical: isVertical,
          type: type
        })
        this.movePos(data[endPhase] - data[startPhase], translateType)
      })
    },
    /**
     * 获取动画实例
     * @param {Boolean} ifAnimate 是否带动画
     * @param {String} animateType 动画过渡类型，如 'linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end' 等
     */
    getAnimation(ifAnimate, animateType) {
      return wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: ifAnimate ? DURATION : 0,
        timingFunction: animateType || TIMEING_FUNCTION,
        delay: 0
      })
    },
    // 获取屏幕滑动方向，'prev'：向前/上，  'next'：向后/下
    getViewDirection(e){
      let {isVertical} = this.data
      let {distanceX, distanceY} = e
      let direction = ''

      direction = isVertical
        ? (distanceY > 0 ? 'prev' : 'next')
        : (distanceX > 0 ? 'prev' : 'next')

      return direction
    },
    /*
     * 动态更新指定样式属性变量的值
     * @param {*} attr 样式属性名
     * @param {*} val 样式属性值
     * @param {*} styleName 样式变量
     */
    updateDomStyle(styleObj, styleName) {
      let {itemStyle} = this.data
      let style = parseStyle(itemStyle)
      style = Object.assign(style, styleObj)
      this.setData({
        [styleName]: styleStringify(style)
      })
    },
    // 初始化 dom 结构
    initStruct() {
      let {
        itemHeight, itemWidth, isVertical, visibleDataList
      } = this.data
      let h = 0
      let w = 0
      let count = visibleDataList.length
      let viewBoxStyle = {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }

      if (isVertical) {
        w = itemWidth + 'px'
        h = count * itemHeight + 'px'
        viewBoxStyle['padding-left'] = (itemWidth - itemWidth) / 2 + 'px'
      } else {
        w = count * itemWidth + 'px'
        h = itemHeight + 'px'
        viewBoxStyle['padding-top'] = (itemHeight - itemHeight) / 2 + 'px'
      }

      // 更新容器的宽度，默认
      this.updateDomStyle({
        width: w,
        height: h
      }, 'wrapperStyle')

      this.updateDomStyle({
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }, 'itemStyle')

      this.updateDomStyle(viewBoxStyle, 'viewBoxStyle')
    },
    /*
     * @description 将所有 item 按照 transPositionArr 的偏移量进行移动
     * @param {*} useAnimation 是否启用过渡动画
     */
    moveView(useAnimation) {
      let {isVertical, transPositionArr, itemAnimations} = this.data
      let attr = isVertical ? 'translateY' : 'translateX'

      for (let i = 0; i < itemAnimations.length; i++) {
        let ANIMATION = this.getAnimation(useAnimation)
        let pos = transPositionArr[i]
        ANIMATION[attr](pos).translate3d(0).step()
        itemAnimations[i] = ANIMATION.export()
      }

      this.setData({
        itemAnimations: itemAnimations
      })

      let p = new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, DURATION)
      })
      return p
    },
    // 将指定位置的 item 移动位置
    translateView() {
      let {
        itemWidth, itemHeight, isVertical, visibleDataList, itemAnimations, dataWillUpdateAt, viewDirection
      } = this.data
      let len = visibleDataList.length
      let attr = isVertical ? 'translateY' : 'translateX'
      let pos = isVertical ? itemHeight : itemWidth
      if(viewDirection === 'prev')  pos = -pos

      this.data.transPositionArr[dataWillUpdateAt] += pos * len
      this.data.transPositionStoreArr[dataWillUpdateAt] += pos * len

      // false表示不启用动画过渡，直接移过去即可
      let ANIMATION = this.getAnimation(false)
      ANIMATION[attr](pos).translate3d(0).step()
      itemAnimations[dataWillUpdateAt] = ANIMATION.export()

      this.setData({
        itemAnimations: itemAnimations
      })
    },
    moveViewToAdapter(useAnimation) {
      let {
        nowViewDataIndex, dataList, viewDirection, itemHeight, itemWidth, isVertical, transPositionStoreArr, transPositionArr
      } = this.data
      let len = dataList.length

      if(viewDirection !== 'springback'){
        nowViewDataIndex = viewDirection === 'next'
          ? (nowViewDataIndex + len + 1) % len
          : (nowViewDataIndex + len - 1) % len

        this.data.nowViewDataIndex = nowViewDataIndex
        this.data.dataWillUpdateAt = viewDirection === 'next'
          ? (nowViewDataIndex + len + 1) % len
          : (nowViewDataIndex + len - 1) % len

        // 在翻页开始的时候，将这个方向的数据加载态设为正在加载
        this.data.newDataListStatus[viewDirection] = 'pending'

        for (let i = 0; i < dataList.length; i++) {
          viewDirection === 'next'
            ? transPositionArr[i] = transPositionStoreArr[i] - (isVertical ? itemHeight : itemWidth)
            : transPositionArr[i] = transPositionStoreArr[i] + (isVertical ? itemHeight : itemWidth)
        }
        this.data.transPositionArr = transPositionArr
        this.data.transPositionStoreArr = transPositionArr.slice()
      }else{
        // 如果是 'springback'，则将屏幕弹回去
        this.data.transPositionArr = transPositionStoreArr.slice()
      }

      // 是否可以进行过渡
      if (!this.canTransforming()) {
        return null
      }

      if (viewDirection === 'prev') {
        this.triggerEvent('firstView', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        })
      }

      if (viewDirection === 'next') {
        this.triggerEvent('lastView', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        })
      }

      return this.moveView(useAnimation).then(() => {
        this.triggerEvent('afterViewChange', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        })
        this.setData({
          tranforming: false
        })

        // 如果是翻页（而不是把屏幕弹回之前位置），则需要将某一个item移动到合适的位置
        if(viewDirection !== 'springback'){
          this.translateView()
        }
      })
    },
    // 是否可以进行过渡
    canTransforming() {
      let {
        tranforming
      } = this.data
      if (tranforming) {
        return false
      }
      this.setData({
        tranforming: true
      })
      return true
    },
    // 移动到指定像素位置
    movePos(pos, type = 'translateX') {
      if (this.data.tranforming) {
        return
      }
      let {
        itemHeight, itemWidth, dataList, transPositionArr, transPositionStoreArr
      } = this.data
      let min = 0
      let max = 0
      let maxDistance = 0
      let len = dataList.length

      if (type === 'translateX') {
        max = itemWidth
        min = -(len - 2) * itemWidth
        maxDistance = itemWidth
      } else {
        max = itemWidth
        min = -(len - 2) * itemHeight
        maxDistance = itemHeight
      }
      maxDistance -= 10
      if (Math.abs(pos) > maxDistance) {
        return
      }

      if (pos > max) {
        pos = max
      }

      if (pos < min) {
        pos = min
      }

      for (let i = 0; i < dataList.length; i++) {
        transPositionArr[i] = transPositionStoreArr[i] + pos
      }
      this.data.transPositionArr = transPositionArr

      this.moveView()
    },
    onTap(e) {
      this.triggerEvent('onTap', {
        index: this.data.nowViewDataIndex,
        itemData: this.data.dataList[this.data.nowViewDataIndex],
        nativeEvent: e
      })
    },
    // 初始化数据
    initData(){
      let {
        dataList, initIndex, itemHeight, itemWidth, isVertical, transPositionArr, itemAnimations
      } = this.data

      // 初始化每个item的位置偏移量和每个item的动画实例
      for (let i = 0; i < dataList.length; i++) {
        itemAnimations[i] = this.getAnimation()
        transPositionArr[i] = (isVertical ? itemHeight : itemWidth) * (i - initIndex)
      }

      this.setData({
        visibleDataList: dataList,
        itemAnimations: itemAnimations,
        transPositionArr: transPositionArr,
        transPositionStoreArr: transPositionArr.slice(),
      })
    },
    // 初始化无限列表 DOM
    initVisibleDOM(){
      let {visibleDataList} = this.data
      
      // 第一次初始化页面
      if(visibleDataList.length === 0){
        this.initData()
        this.initStruct()
        this.moveView()
      }
    }
  },
  lifetimes: {
    ready() {
      this.registerTouchEvent()
      // this.initVisibleDOM()
    }
  },
  pageLifetimes: {}
})
