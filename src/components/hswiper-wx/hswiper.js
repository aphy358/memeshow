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

/**
 * 获取动画实例
 * @param {Boolean} ifAnimate 是否带动画
 * @param {String} animateType 动画过渡类型，如 'linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end' 等
 */
const getAnimation = (ifAnimate, animateType) => {
  return wx.createAnimation({
    transformOrigin: '50% 50%',
    duration: ifAnimate ? DURATION : 0,
    timingFunction: animateType || TIMEING_FUNCTION,
    delay: 0
  })
}


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
    // 上翻还是下翻，prev：上翻/前翻，  next：下翻/后翻
    viewDirection: 'next',
    dataWillUpdateAt: -1,
    // 'resolved'、'pending'
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
          console.log('newDataList: ' + JSON.stringify(newVal));

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
        let {isVertical} = this.data
        let {distanceX, distanceY, duration} = e
        let _direction = this.getViewDirection(e)

        this.data.viewDirection = _direction
        if(isVertical){
          if(duration > 300 && Math.abs(distanceY) * 2 < SCREEN_HEIGHT) this.data.viewDirection = 'goback'
        }else{
          if(duration > 300 && Math.abs(distanceX) * 2 < SCREEN_WIDTH) this.data.viewDirection = 'goback'
        }

        if(this.data.newDataListStatus[_direction] === 'resolved'){
          this.moveViewToAdapter(true)
          let direction = this.data.viewDirection === 'next' ? 'prev' : 'next'
          this.data.newDataListStatus[direction] = 'resolved'
        }
      })

      touchHandle.listen('touchmove', (data) => {
        let {newDataListStatus, nowViewDataIndex, tranforming, isVertical} = this.data
        let tmpDirection = this.getViewDirection(data)

        if(newDataListStatus[tmpDirection] === 'pending'){
          return
        }
        
        // 过渡中禁止手指滑动
        if (tranforming) {
          return
        }
        console.log('newDataListStatus: ' + newDataListStatus[tmpDirection]);
        
        this.triggerEvent('move', {
          index: nowViewDataIndex,
          nativeEvent: data,
          isVertical: isVertical,
          type: type
        })
        this.movePos(data[endPhase] - data[startPhase], translateType)
      })
    },
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
        let ANIMATION = getAnimation(useAnimation)
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

      // 是否启用动画过渡
      let ANIMATION = getAnimation(false)
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

      if(viewDirection !== 'goback'){
        viewDirection === 'next'
          ? nowViewDataIndex = (nowViewDataIndex + len + 1) % len
          : nowViewDataIndex = (nowViewDataIndex + len - 1) % len
        this.data.nowViewDataIndex = nowViewDataIndex
  
        this.data.dataWillUpdateAt = viewDirection === 'next'
          ? (nowViewDataIndex + len + 1) % len
          : (nowViewDataIndex + len - 1) % len

        this.data.newDataListStatus[viewDirection] = 'pending'

        for (let i = 0; i < dataList.length; i++) {
          viewDirection === 'next'
            ? transPositionArr[i] = transPositionStoreArr[i] - (isVertical ? itemHeight : itemWidth)
            : transPositionArr[i] = transPositionStoreArr[i] + (isVertical ? itemHeight : itemWidth)
        }
        this.data.transPositionArr = transPositionArr
        this.data.transPositionStoreArr = transPositionArr.slice()
      }else{
        // 如果是 'goback'，则将屏幕弹回去
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
        console.log('transPositionStoreArr:' + transPositionStoreArr);

        this.triggerEvent('afterViewChange', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        })
        this.setData({
          tranforming: false
        })

        if(viewDirection !== 'goback'){
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

      for (let i = 0; i < dataList.length; i++) {
        itemAnimations[i] = getAnimation()
        transPositionArr[i] = -(isVertical ? itemHeight : itemWidth) * initIndex
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
