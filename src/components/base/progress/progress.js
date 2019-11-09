import { animateTo, addUnit } from '@/components/common/utils';

Component({
  externalClasses: ['custom-class'],

  properties: {
    inactive: Boolean,
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    showPivot: {
      type: Boolean,
      value: true
    },
    showDotPivot: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: '#1989fa'
    },
    textColor: {
      type: String,
      value: '#fff'
    },
    strokeWidth: {
      type: String | Number,
      observer: 'setStrokeWidthUnit'
    },
    // 用户自定义动画
    customAnimation: {
      type: Object,
      value: null
    },
    // 是否正在加载
    loading: {
      type: Boolean,
      value: false,
      observer: 'switchLoadingStatus'
    },
  },

  data: {
    strokeWidthUnit: '8rpx',

    // 等待加载时的动画
    loadingAnimation: null,

    // 等待加载时的 `interval`
    loadingInterval: null,
  },

  methods: {
    setStrokeWidthUnit(val) {
      this.setData({
        strokeWidthUnit: addUnit(val)
      });
    },

    // 切换加载等待状态
    switchLoadingStatus (isLoading) {
      if(isLoading){
        this.data.loadingInterval = setInterval(() => {
          let loadingAnimation = animateTo({ 'width': '0%' }, 0)
          this.setData({ loadingAnimation })

          loadingAnimation = animateTo({ 'width': '100%' }, 500)
          this.setData({ loadingAnimation })
        }, 600);
      }else{
        clearInterval(this.data.loadingInterval)
        let loadingAnimation = animateTo({ 'width': '0%' }, 0)
        this.setData({ loadingAnimation })
      }
    }
  }
})
