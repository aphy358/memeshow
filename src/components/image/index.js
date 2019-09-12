const DEFAULT_IMG = '/assets/your_default_img'

Component({
  properties: {
    // 图片地址
    src: String,
    // 图片加载中，以及加载失败后的默认地址
    errSrc: {
      type: String,
      // 默认是球队图标
      value: DEFAULT_IMG,
    },
    width: {
      type: String,
      value: '48rpx',
    },
    height: {
      type: String,
      value: '48rpx',
    },
    // 样式字符串
    styleStr: {
      type: String,
      value: '',
    },
    // 图片裁剪、缩放的模式（详见文档）
    imgMode: {
      type: String,
      value: 'scaleToFill',
    },
  },
  data: {
    imgSrc: '',
    isLoading: true,
  },
  methods: {
    // 加载图片出错
    _onImageError(e) {
      this.setData({
        imgSrc: this.data.errSrc,
      })
      this.triggerEvent('onImageError', e)
    },
    // 加载图片完毕
    _onImageLoad(e) {
      this.setData({ isLoading: false })
      this.triggerEvent('onImageLoad', e)
    },
  },
})
