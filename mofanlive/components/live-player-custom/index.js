import { connectComponent } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
import { safeArea } from "ui-kit/behaviors/index"
import _ from 'lodash'
import HTouch from 'libs/hTouch.js'
const touchHandle = new HTouch()

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  behaviors: [safeArea(), computedBehavior],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    /**
     * 模式 - ['live', 'RTC']
     */
    mode: {
      type: String,
      value: "RTC"
    },

    /**
     * 填充模式 - ['contain', 'fillCrop']
     */
    objectFit: {
      type: String,
      value: "contain"
    },

    /**
     * 自定义样式
     */
    myStyle: {
      type: String,
      value: ""
    },

    /**
     * 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变，当同时设置了 widthFix 和 heightFix 时，以 widthFix 为准。
     */
    widthFix: {
      type: Boolean,
      value: false
    },

    /**
     * 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变，当同时设置了 widthFix 和 heightFix 时，以 widthFix 为准。
     */
    heightFix: {
      type: Boolean,
      value: false
    },

    /**
     * 是否显示关闭直播界面的按钮
     */
    closeable: {
      type: Boolean,
      value: false
    },

    /**
     * 是否可拖拽
     */
    dragable: {
      type: Boolean,
      value: false
    },

    src: {
      type: String,
      value: "rtmp://media3.sinovision.net:1935/live/livestream"
    }
  },

  data: {
    // 外框的尺寸和坐标
    elemClientRect: {},

    // live-player 组件上是否显示 ‘正在连接...’ 字样
    showLiveHolder: true,

    // 视频宽度
    videoWidth: 0,

    // 视频高度
    videoHeight: 0,

    // 附加在 live-player 上的额外样式
    exStyle: ''
  },

  watch: {
    // 当获取到视频的播放宽度的时候
    videoWidth(newVal, oldVal) {
      if (newVal > 0) {
        let { widthFix, heightFix, videoWidth, videoHeight, elemClientRect } = this.data

        // 当明确了视频的自适应方式的时候才会根据视频的宽高比来调整 live-player 组件的宽高
        if (widthFix || heightFix) {
          if (widthFix) {
            // 如果是宽度不变，则自适应高度
            let exHeight = videoHeight / videoWidth * elemClientRect.width
            elemClientRect.height = exHeight
          } else {
            // 如果是高度不变，则自适应宽度
            let exWidth = videoWidth / videoHeight * elemClientRect.height
            elemClientRect.width = exWidth
          }

          let exStyle = this.getExStyle(elemClientRect)
          this.setData({ exStyle, elemClientRect })
        }
      }
    },
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
      e.type = 'touchstart'
    },

    onClick() {
      this.triggerEvent("click")
    },

    onTouchEnd(e, eventType = 'touchend') {
      let { elemClientRect } = this.data
      const { distanceX, distanceY } = e

      elemClientRect.top = elemClientRect.top + distanceY
      elemClientRect.left = elemClientRect.left + distanceX
      this.setData({ elemClientRect })
    },

    onTouchCancel(e) {
      this.onTouchEnd(e, 'touchcancel')
    },

    onTouchMove(e) {
      e.type = 'touchmove'
      const { elemClientRect } = this.data
      const { distanceX, distanceY } = e

      let _elemClientRect = _.cloneDeep(elemClientRect)
      _elemClientRect.top = _elemClientRect.top + distanceY
      _elemClientRect.left = _elemClientRect.left + distanceX
      let exStyle = this.getExStyle(_elemClientRect)
      this.setData({ exStyle })
    },

    onClose() { this.triggerEvent("close") },

    /**
     * 初始化直播
     */
    initLive() {
      this.playContext = wx.createLivePlayerContext('player', this);
    },

    /**
     * 重新启动直播
     */
    restartLive() {
      let _this = this
      this.playContext.stop({
        complete(e) {
          _this.startLive()
        }
      })
    },

    /**
     * 开启直播
     */
    startLive() {
      let _this = this
      this.playContext.play({
        success: function () {
        },
        fail(e) {
          setTimeout(() => {
            _this.startLive()
          }, 300);
        }
      });
    },

    /**
     * 停止直播
     */
    stopLive(e) {
      this.playContext.stop()
    },

    /**
     * 播放状态变化事件 - detail = {code}
     */
    statechange({ detail }) {
      const { code } = detail
      const _this = this

      if (code === 2003) {    // 网络接收到首个视频数据包(IDR)
        _this.setData({ showLiveHolder: false })
      } else if (code === 2103) {   // 网络断连, 已启动自动重连
        _this.setData({ showLiveHolder: true })
        this.restartLive()
      }
    },

    /**
     * 网络状态通知 - detail = {info}
     */
    netstatus({ detail }) {
      const { videoWidth, videoHeight } = detail.info
      if (!this.data.videoWidth) {
        this.setData({
          videoWidth,
          videoHeight,
        })
      }
    },

    /**
     * 获取调整之后的样式
     */
    getExStyle(elemClientRect) {
      const { safeArea } = this.data

      if (elemClientRect.top < 0) elemClientRect.top = 0
      if (elemClientRect.top > safeArea.height - elemClientRect.height - safeArea.top) elemClientRect.top = safeArea.height - elemClientRect.height - safeArea.top

      if (elemClientRect.left < 0) elemClientRect.left = 0
      if (elemClientRect.left > safeArea.width - elemClientRect.width) elemClientRect.left = safeArea.width - elemClientRect.width

      return `position:fixed;top:${elemClientRect.top}px;left:${elemClientRect.left}px;width:${elemClientRect.width}px;height:${elemClientRect.height}px;z-index:99999;`
    },

    /**
     * 获取 live-player 组件的原始宽高
     */
    getDomSize() {
      const _this = this
      const query = wx.createSelectorQuery()
      query.in(this).select('#player').boundingClientRect()
      query.exec(function(res){
        let elemClientRect = res[0]
        let exStyle = _this.getExStyle(elemClientRect)
        _this.setData({ elemClientRect, exStyle })
      })
    }
  },

  ready() {
    this.initLive()
    this.startLive()

    const { widthFix, heightFix, dragable } = this.data
    if (widthFix || heightFix || dragable) this.getDomSize()
    if (dragable) this.registerTouchEvent()
  },

  lifetimes: {
    attached: function () {
      if (this.data.myStyle) {
        this.setData({ exStyle: this.data.myStyle })
      }
    },

    detached: function () {
      if (this.data.dragable) this.removeListeners()
    },
  },
}))