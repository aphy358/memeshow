import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store
import { safeArea } from "behaviors/index"
import { animateTo } from 'libs/utils.js';

let componentConfig = {
  behaviors: [safeArea()],

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

    // 总的视频时长
    videoDuration: {
      type: Number,
      value: 0
    },

    // 视频当前播放时间点
    currentVideoTime: {
      type: Number,
      value: 0,
      observer: "currentVideoTimeChange"
    },

    // 当前视频是否正在加载
    isLoading: {
      type: Boolean,
      value: false,
      observer: "videoToggleLoading"
    },

    // 当前视频是否被暂停
    isVideoPaused: {
      type: Boolean,
      value: false,
      observer: "videoTogglePaused"
    },

    touchEvent: {
      type: Object,
      value: null,
      observer: "touchActions"
    },
  },

  data: {
    // 滑动进度条时候的 videoTime
    touchProgressVideoTime: 0,

    // 是否正在滑动进度条
    touchProgress: false,

    // 进度条动画
    progressAnimation: {},

    // 进度条随着滑动而到达的新的时间点
    progressNewPos: 0,

    // 进度条是否处于加载中的动画状态
    progressLoading: false,
  },

  methods: {
    videoTogglePaused(isPaused) {
      if (isPaused) {
        setTimeout(() => {
          this.pauseProgress()
        }, 100);
      } else {
        if(this.data.videoDuration){
          this.restartProgress()
          this.setData({ touchProgress: false })
          this.triggerEvent('touchingProgress', false)
        }
      }
    },

    videoToggleLoading(isLoading) {
      if (isLoading) {
        this.pauseProgress()
        this.data.waitTimeout = setTimeout(() => {
          this.setData({ progressLoading: true })
        }, 300);

      } else {
        clearTimeout(this.data.waitTimeout)
        this.setData({ progressLoading: false })
      }
    },

    // 播放进度改变时
    currentVideoTimeChange(newVTime, oldVTime) {
      const { videoDuration } = this.data
      if (videoDuration === 0)  return

      // 如果是第一次播放，或者是重复播放，先将进度条归位，并开启进度条动画
      if(oldVTime > newVTime){
        this.resetProgress(newVTime / videoDuration * 100)

        let progressAnimation = animateTo(
          { 'width': '100%' }, 
          (videoDuration - newVTime) * 1000, 
          'linear'
        )
        
        setTimeout(() => {
          this.setData({ progressAnimation })
        }, 50);

      }else{
        // 如果是一般时刻的进度更新，则先判断下之前有没有等待加载的情况，如果有，则先清空定时器
        if(this.data.waitTimeout){
          this.restartProgress()
          clearTimeout(this.data.waitTimeout)
        }
      }
    },

    videoActive(ifActive) {
      this.resetProgress()
    },

    touchActions(e) {
      if (this.data.active) {
        switch (e.type) {
          case 'touchstart':
            this.onTouchStart(e)
            break;

          case 'touchmove':
            this.onTouchMove(e)
            break;

          case 'touchend':
            this.onTouchEnd(e)
            break;

          case 'touchcancel':
            this.onTouchCancel(e)
            break;
        
          default:
            break;
        }
      }
    },

    onTouchStart(e) {},

    touchStartProgress(e) {
      // 通知上层组件禁止滚动视频
      this.triggerEvent('preventSwipe', true)
      this.triggerEvent('touchingProgress', true)
      // 暂停滚动条进度动画
      this.pauseProgress()
      // 把当前 video 的时间进度赋值给滑动进度条时的 video 进度
      this.setData({ 
        touchProgressVideoTime: this.data.currentVideoTime,
        touchProgress: true
      })
    },

    onTouchMove(e) {
      if (this.data.active && this.data.touchProgress) {
        const { distanceX } = e
        const { videoDuration, touchProgressVideoTime, safeArea } = this.data
        let newRate = (touchProgressVideoTime / videoDuration + distanceX / safeArea.width) * 100
        newRate = Math.max(0, Math.min(newRate, 100))
        const progressNewPos = newRate / 100 * videoDuration

        this.setData({ progressNewPos })
        this.resetProgress(newRate)
      }
    },

    onTouchEnd(e) {
      if (this.data.active && this.data.touchProgress) {
        const { distanceX } = e
        const { videoDuration, touchProgressVideoTime, safeArea } = this.data

        // 通知上层组件可以滚动视频
        this.triggerEvent('preventSwipe', false)

        // 计算进度条新的进度
        let newPos = distanceX / safeArea.width * videoDuration + touchProgressVideoTime
        newPos = Math.max(0, Math.min(newPos, videoDuration))

        let newRate = (touchProgressVideoTime / videoDuration + distanceX / safeArea.width) * 100
        newRate = Math.max(0, Math.min(newRate, 100))

        this.setData({ currentVideoTime: newPos, touchProgress: false })
        setTimeout(() => {
          this.resetProgress(newRate)
        }, 300);

        this.triggerEvent('progressPercentChanged', newPos)
        this.triggerEvent('touchingProgress', false)
      }
    },

    onTouchCancel(e) {
      this.onTouchEnd(e)
    },

    // 暂停进度条动画
    pauseProgress(){
      const { videoDuration, currentVideoTime } = this.data
      const rate = currentVideoTime / videoDuration * 100 + '%'

      let progressAnimation = animateTo({ 'width': rate }, 0, 'linear')
      this.setData({ progressAnimation })
    },

    // 重新开始进度条动画（在原来的进度基础上）
    restartProgress(){
      const { videoDuration, currentVideoTime } = this.data

      let progressAnimation = animateTo(
        { 'width': '100%' }, 
        (videoDuration - currentVideoTime) * 1000, 
        'linear'
      )

      this.setData({ progressAnimation })
    },

    // 将进度条设置为指定进度
    resetProgress(percent){
      let progressAnimation = animateTo({ 'width': (percent || 0) + '%' }, 0)
      this.setData({ progressAnimation })
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