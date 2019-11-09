import { animateTo } from '@/components/common/utils'

Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    videoActive: {
      type: Boolean,
      value: false,
      observer: 'toggleVideoActive'
    },
  },

  data: {
    // 广告牌显示计时器
    adTimeout: null,

    // 广告牌动画
    adAnimation: {},

    // 广告牌是否已经显示
    adShown: false,
  },

  methods: {
    toggleVideoActive(isActive) {
      setTimeout(() => {
        if(isActive){   // 视频滑入
          this.showAdBoard()
        }else{        // 视频滑出
          this.hideAdBoard()
        }
      }, 300);
    },

    // 隐藏广告面板
    hideAdBoard(){
      // 如果广告牌还没显示出来，但是之前已经设置了定时器，则删除该定时器，比如用户在短时间内上下翻动视频的时候就会出现这种情况
      if(!this.data.adShown && this.data.adTimeout){
        clearTimeout(this.data.adTimeout)
        this.data.adTimeout = null
      }

      let adAnimation = animateTo({
        'left': '-20rpx',
        'translateX': '-100%',
        'translateY': '-100%'
      })
      this.setData({ adAnimation })
      this.data.adShown = false
    },

    // 显示广告面板
    showAdBoard(){
      // 当前视频被激活后，3秒后显示广告牌
      this.data.adTimeout = setTimeout(() => {
        let adAnimation = animateTo({
          'left': '0',
          'translateX': '0',
          'translateY': '-100%'
        })
        this.setData({ adAnimation })
        this.data.adShown = true
      }, 3000);
    },
  }
})
