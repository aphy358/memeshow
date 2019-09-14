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
    wrapperAnimation: {},
    itemAnimation: [],
    wrapperStyle: '',
    itemStyle: '',
    // 当前显示的数据所在数组的下标
    nowViewDataIndex: 1,
    nowTranX: 0,
    nowTranY: 0,
    visibleDataList: [],
    // 最外层可视区域盒子的样式
    viewBoxStyle: '',
    // 是否过渡中
    tranforming: false
  },
  properties: {
    // 传入的数据
    dataList: {
      type: Array,
      value: [],
      observer(newVal) {
        if(newVal.length > 0){
          this.setVisibleDOM()
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
        // debugger
      }
    },
    // 移动到指定试图，伴随过渡动画
    moveTo: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.moveViewToAdapter(newVal, true)
      }
    },
    // 移动到指定试图，无过渡动画
    moveToWithOutAnimation: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.moveViewToAdapter(newVal)
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
    // 滚动图的宽度
    width: {
      type: Number,
      value: SCREEN_WIDTH,
      observer(newVal) {
        let tempReduceDistance = (this.data.padding + this.data.paddingX) * 2
        this.setData({
          itemWidth: newVal - tempReduceDistance
        })
      }
    },
    // 滚动图的高度
    height: {
      type: Number,
      value: SCREEN_HEIGHT,
      observer(newVal) {
        let tempReduceDistance = (this.data.padding + this.data.paddingY) * 2
        this.setData({
          itemHeight: newVal - tempReduceDistance
        })
      }
    },
    // 垂直和水平方向各自减少的距离
    padding: {
      type: Number,
      value: 0,
      observer(newVal) {
        let tempReduceDistanceX = (newVal + this.data.paddingX) * 2
        let tempReduceDistanceY = (newVal + this.data.paddingY) * 2
        this.setData({
          itemWidth: this.data.width - tempReduceDistanceX,
          itemHeight: this.data.height - tempReduceDistanceY
        })
      }
    },
    // 水平方向减少的距离
    paddingX: {
      type: Number,
      value: 0,
      observer(newVal) {
        let tempReduceDistanceX = (newVal + newVal) * 2
        let tempReduceDistanceY = (this.data.paddingY + this.data.paddingY) * 2
        this.setData({
          itemWidth: this.data.width - tempReduceDistanceX,
          itemHeight: this.data.height - tempReduceDistanceY
        })
      }
    },
    // 垂直方向减少的距离
    paddingY: {
      type: Number,
      value: 0,
      observer(newVal) {
        let tempReduceDistanceX = (this.data.padding + this.data.paddingX) * 2
        let tempReduceDistanceY = (this.data.padding + newVal) * 2
        this.setData({
          itemWidth: this.data.width - tempReduceDistanceX,
          itemHeight: this.data.height - tempReduceDistanceY
        })
      }
    },
    // 是否为垂直
    vertical: {
      type: Boolean,
      value: true
    },
    // 是否循环
    recycle: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    touchstart: touchHandle.touchstart.bind(touchHandle),
    touchmove: touchHandle.touchmove.bind(touchHandle),
    touchend: touchHandle.touchend.bind(touchHandle),
    registerTouchEvent() {
      let {vertical} = this.data
      if (!vertical) {
        touchHandle.listen('touchleft', () => {
          this.nextView()
        })
        touchHandle.listen('touchright', () => {
          this.preView()
        })
        touchHandle.listen('touchmove', (data) => {
          // 过渡中禁止手指滑动
          if (this.data.tranforming) {
            return
          }
          this.triggerEvent('move', {
            index: this.data.nowViewDataIndex,
            nativeEvent: data,
            vertical: this.data.vertical,
            type: 'x'
          })
          this.movePos(data.endX - data.startX, 'translateX')
        })
        return
      }
      // 垂直方向滚动
      touchHandle.listen('touchup', () => {
        this.nextView()
      })

      touchHandle.listen('touchdown', () => {
        this.preView()
      })
      touchHandle.listen('touchmove', (data) => {
        this.triggerEvent('move', {
          index: this.data.nowViewDataIndex,
          nativeEvent: data,
          vertical: this.data.vertical,
          type: 'x'
        })
        this.movePos(data.endY - data.startY, 'translateY')
      })
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
        itemHeight, itemWidth, vertical, width, height, visibleDataList
      } = this.data
      let h = 0
      let w = 0
      let count = visibleDataList.length
      let viewBoxStyle = {
        width: width + 'px',
        height: height + 'px'
      }
      if (vertical) {
        w = itemWidth + 'px'
        h = count * itemHeight + 'px'
        viewBoxStyle['padding-left'] = (width - itemWidth) / 2 + 'px'
      } else {
        w = count * itemWidth + 'px'
        h = itemHeight + 'px'
        viewBoxStyle['padding-top'] = (height - itemHeight) / 2 + 'px'
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
     * @description 移动到指定 dom index 位置
     * @param {*} domIndex dom元素的index
     * @param {*} useAnimation 是否启用过渡动画
     */
    moveViewTo(domIndex, useAnimation) {
      console.log('domIndex:' + domIndex);
      let {
        itemWidth, itemHeight, vertical, padding, paddingX, paddingY, recycle, visibleDataList
      } = this.data
      let len = visibleDataList.length

      if (recycle) {
        // domIndex = Math.max(domIndex, 1)
        // domIndex = Math.min(domIndex, len - 1)
      } else {
        domIndex = Math.max(domIndex, 0)
        domIndex = Math.min(domIndex, len - 1)
      }

      let pos = 0
      let attr = 'translateY'
      let posType = 'nowTranY'
      // 垂直方向
      if (vertical) {
        pos = -domIndex * itemHeight + padding + paddingX
      } else {
        // 水平方向
        pos = -domIndex * itemWidth + padding + paddingY
        attr = 'translateX'
        posType = 'nowTranX'
      }

      // 是否启用动画过渡
      let ANIMATION = useAnimation
        ? getAnimation(true)
        : getAnimation(false)

      ANIMATION[attr](pos).translate3d(0).step()
      this.setData({
        wrapperAnimation: ANIMATION.export(),
        [posType]: pos
      })

      let p = new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, DURATION)
      })
      return p
    },
    // 向后一个视图
    nextView(useAnimation = true) {
      let {nowViewDataIndex} = this.data
      let nextIndex = nowViewDataIndex + 1
      this.moveViewToAdapter(nextIndex, useAnimation)
    },
    // 向前一个视图
    preView(useAnimation = true) {
      let {nowViewDataIndex} = this.data
      let nextIndex = nowViewDataIndex - 1
      this.moveViewToAdapter(nextIndex, useAnimation)
    },
    moveViewToAdapter(nextIndex, useAnimation) {
      let {nowViewDataIndex, dataList} = this.data
      let len = dataList.length
      let originNextIndex = nextIndex
      nextIndex = Math.abs((nextIndex + len) % len)

      if (!this.data.recycle) {
        // 当前是否已经是最后一个
        if (nowViewDataIndex === (len - 1) && originNextIndex >= len) {
          this.triggerEvent('alreadyLastView', {
            index: nowViewDataIndex,
            item: dataList[nowViewDataIndex]
          })
          this.moveViewTo(nowViewDataIndex, useAnimation)
          return null
        }

        // 当前是否已经是第一个
        if (nowViewDataIndex === 0 && originNextIndex < 0) {
          this.triggerEvent('alreadyFirstView', {
            index: nowViewDataIndex,
            item: dataList[nowViewDataIndex]
          })
          this.moveViewTo(nowViewDataIndex, useAnimation)
          return null
        }
      }

      // 是否可以进行过渡
      if (!this.canTransforming()) {
        return null
      }

      if (nextIndex === 0) {
        this.triggerEvent('firstView', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        })
      }

      if (nextIndex === (len - 1)) {
        this.triggerEvent('lastView', {
          index: nowViewDataIndex,
          item: dataList[nowViewDataIndex]
        })
      }

      this.triggerEvent('beforeViewChange', {
        index: nowViewDataIndex,
        from: nowViewDataIndex,
        to: nextIndex,
        item: dataList[nowViewDataIndex]
      })
      
      return this.moveViewTo(originNextIndex, useAnimation).then(() => {
        let isReset = false
        if ((originNextIndex) < 0) {
          isReset = true
        }
        if ((originNextIndex) >= dataList.length) {
          isReset = true
        }

        this.setData({
          nowViewDataIndex: nextIndex
        })
        if (isReset) {
          console.log('reset.............');
          
          this.moveViewTo(nextIndex)
        }
        return null
      }).then(() => {
        this.triggerEvent('afterViewChange', {
          index: nextIndex,
          from: nowViewDataIndex,
          to: nextIndex,
          item: dataList[nextIndex]
        })
        this.setData({
          tranforming: false
        })
        return null
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
        itemHeight, itemWidth, nowTranY, nowTranX, dataList
      } = this.data
      let nowTran = 0
      let min = 0
      let max = 0
      let maxDistance = 0
      let len = dataList.length
      if (type === 'translateX') {
        nowTran = nowTranX + pos
        max = itemWidth
        min = -(len - 2) * itemWidth
        maxDistance = itemWidth
      } else {
        nowTran = nowTranY + pos
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

      const MOVE_ANIMATION = getAnimation(false)
      MOVE_ANIMATION[type](nowTran).translate3d(0).step()
      this.setData({
        wrapperAnimation: MOVE_ANIMATION.export()
      })
    },
    onTap(e) {
      this.triggerEvent('onTap', {
        index: this.data.nowViewDataIndex,
        itemData: this.data.dataList[this.data.nowViewDataIndex],
        nativeEvent: e
      })
    },
    // 渲染无限列表 DOM
    setVisibleDOM(){
      if(this.data.dataList && this.data.dataList.length){
        let {nowViewDataIndex, visibleDataList, dataList, initIndex} = this.data
        let isFirstTime = visibleDataList.length === 0
        
        // 第一次初始化页面
        if(isFirstTime){
          this.setData({
            visibleDataList: dataList
          })
          this.initStruct()
          this.moveViewTo(initIndex)
        }
      }
    }
  },
  lifetimes: {
    ready() {
      this.registerTouchEvent()
      // this.setVisibleDOM()
    }
  },
  pageLifetimes: {}
})
