
const TIMING_FUNCTION_ARRAY = ['linear', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end']
const POPUP_DEFAULT_WIDTH = '100%'
const POPUP_DEFAULT_HEIGHT = '600rpx'

Component({
  properties: {
    // 是否显示 hpopup
    showPopup: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (!this.data.initialized){
          return setTimeout(() => {
            this.switchPopupStatus(newVal)
          }, 300);
        }

        this.switchPopupStatus(newVal)
      }
    },

    // 弹框高度，可传入百分比，如 '50%'，也可传入具体的值，如 '200rpx' / '200px'
    height: {
      type: String,
      value: POPUP_DEFAULT_HEIGHT
    },

    // 弹框宽度，可传入百分比，如 '50%'，也可传入具体的值，如 '200rpx' / '200px'
    width: {
      type: String,
      value: POPUP_DEFAULT_WIDTH
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

    // 弹框位置：'top'、'bottom'、'left'、'right'、'center'
    position: {
      type: String,
      value: 'bottom'
    },

    // 弹框出现的方向：'top'、'bottom'、'left'、'right'（只有当 'position' 为 'center' 的时候才生效）
    animateFrom: {
      type: String,
      value: 'bottom'
    },

    // hpopup-body自定义样式
    bodyStyle: {
      type: String,
      value: '',
    },

    // popup遮罩层自定义样式
    popupMaskStyle: {
      type: String,
      value: '',
    },

    // 动画持续时间
    animationDuration: {
      type: Number,
      value: 300
    },
  },

  data: {
    // 弹框尺寸
    popupBodySize: {
      width: 0,
      height: 0
    },

    // 屏幕尺寸
    screenSize: {
      width: 375,
      height: 667
    },

    // hpopup-body最终拼接样式
    bodyFinalStyle: '',

    // 动画实例
    popupAnimation: null,

    // 是否正在动画中
    transforming: false,

    // 动画
    timingFunction: 'ease-out',

    // 是否显示弹框
    ifShow: false,

    // 是否已经初始化
    initialized: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initialize(){
      this.getScreenSize()

      // 获取弹框尺寸
      wx.createSelectorQuery().in(this).select('.hpopup-body').boundingClientRect().exec(res => {
        const width = res[0].width
        const height = res[0].height
        // 设置弹框尺寸
        const popupBodySize = { width, height }
        // 拼接弹框样式
        const bodyFinalStyle = this.initBodyFinalStyle(width, height)

        this.setData({ 
          popupBodySize, 
          bodyFinalStyle,
          initialized: true
        })
        
        console.log('popupBodySize is ', popupBodySize)
        console.log('bodyFinalStyle is ', bodyFinalStyle)
      })
    },

    // 获取屏幕尺寸
    getScreenSize(){
      const sysInfo = wx.getSystemInfoSync()
      const width = sysInfo.screenWidth
      const height = sysInfo.screenHeight
      this.data.screenSize = { width, height }
    },

    /**
     * 初始化弹框初始位置
     * @param {*} width 弹框宽度
     * @param {*} height 弹框高度
     */
    initBodyFinalStyle(width, height){
      let { position, bodyStyle, animateFrom, screenSize } = this.data
      const screenWidth = screenSize.width
      const screenHeight = screenSize.height
      let tmpStyle = ''

      if(position === 'top' || (position === 'center' && animateFrom === 'top')){
        // 弹框初始位置在屏幕顶部
        tmpStyle = `top: ${-height}px;left: ${(screenWidth - width) / 2}px;`

      }else if(position === 'left' || (position === 'center' && animateFrom === 'left')){
        // 弹框初始位置在屏幕左侧
        tmpStyle = `top: ${(screenHeight - height) / 2}px;left: ${-width}px;`

      }else if(position === 'right' || (position === 'center' && animateFrom === 'right')){
        // 弹框初始位置在屏幕右侧
        tmpStyle = `top: ${(screenHeight - height) / 2}px;left: ${screenWidth}px;`

      }else{
        // 弹框初始位置在屏幕底部 'bottom'
        tmpStyle = `top: ${screenHeight}px;left: ${(screenWidth - width) / 2}px;`

      }
      
      return tmpStyle + bodyStyle
    },

    // 切换弹框显示状态
    switchPopupStatus(newVal){
      const { animationDuration } = this.data
      let offset = this.getOffset()
      let animateType = this.getAnimateType()
      let ifAnimate = animationDuration !== 0

      // 显示弹框
      if(newVal){
        offset = -offset
        this.setData({ ifShow: true })
      }

      // 设置弹框动画
      let popupAnimation = this.animateTo(ifAnimate, animateType, offset)
      this.setData({ popupAnimation, transforming: true })

      // 动画结束，隐藏整个弹框
      setTimeout(() => {
        this.setData({ ifShow: newVal, transforming: false })
      }, animationDuration);

      console.log(`hpopup ${newVal ? 'show' : 'hide'}`);
    },

    getOffset(){
      const { position, animateFrom, popupBodySize } = this.data
      let offset = 0

      if(position === 'top'){
        // 弹框从顶部向上隐藏的位移量
        offset = -popupBodySize.height

      }else if(position === 'bottom'){
        // 弹框从底部向下隐藏的位移量
        offset = popupBodySize.height

      }else if(position === 'left'){
        // 弹框从左侧向左隐藏的位移量
        offset = -popupBodySize.width

      }else if(position === 'right'){
        // 弹框从右侧向右隐藏的位移量
        offset = popupBodySize.width

      }else if(position === 'center'){
        const { screenSize } = this.data
        const screenWidth = screenSize.width
        const screenHeight = screenSize.height

        if(animateFrom === 'top'){
          // 弹框从中间向上隐藏的位移量
          offset = -(screenHeight + popupBodySize.height) / 2

        }else if(animateFrom === 'bottom'){
          // 弹框从中间向下隐藏的位移量
          offset = (screenHeight + popupBodySize.height) / 2

        }else if(animateFrom === 'left'){
          // 弹框从中间向左隐藏的位移量
          offset = -(screenWidth + popupBodySize.width) / 2

        }else if(animateFrom === 'right'){
          // 弹框从中间向右隐藏的位移量
          offset = (screenWidth + popupBodySize.width) / 2
        }
      }

      return offset
    },

    getAnimateType(){
      const { position, animateFrom } = this.data
      let animateType = 'translateX'

      if(
        (position === 'center' && (animateFrom === 'top' || animateFrom === 'bottom'))||
        position === 'top' ||
        position === 'bottom'
      ){
        animateType = 'translateY'
      }

      return animateType
    },

    animateTo(ifAnimate, translateType, offset) {
      const { timingFunction, animationDuration } = this.data
      return wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: ifAnimate ? animationDuration : 0,
        timingFunction,
        delay: 0
      })[translateType](offset).step().export()
    },

    // 点击了遮罩层
    tapMask(){
      let { transforming } = this.data
      if(!transforming){
        console.log(`tapped mask`);

        // 通知点击了遮罩层
        this.triggerEvent('tapMask', {})
      }
    }
  },
  lifetimes: {
    ready() {
      this.initialize()
    }
  }
})
