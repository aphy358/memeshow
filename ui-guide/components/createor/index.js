const app = getApp()
Component({
  properties: {
    isHiddenEditor: {
      type: Boolean,
      value: false
    },
    isForbidden: {
      type: Boolean, //添加按钮是否可以点击
      value: true
    },
    //控件的显示方向，up向下展示，down向上展示
    direction: {
      type: String,
      value:  'down'
    }
  },
  data: {
    isEditor: false
  },
  ready: function() {
    this.setData({
      isEditor: this.data.isHiddenEditor
    })
  },
  methods: {
    /**
     * 创建图文，调用本地相册成功之后，把选择的图片给外面的组件调用者
     */
    selectImage() {
      const that = this
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          that.triggerEvent('selectImage', { paths: tempFilePaths})
        }
      })
    },
    /**
     * 创建文本，直接触发组件调用者事件
     */
    selectText() {
      this.triggerEvent('selectText', {})
    },
    /**
     * 创建视频，调用本地视频成功之后，把选择的视频给外面的组件调用者
     */
    selectVideo() {
      const that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          const tempFilePath = res.tempFilePath
          console.log('tempFilePaths:', tempFilePath)
          that.triggerEvent('selectVideo', { path: tempFilePath })
        }
      })
    },
    shouldEditor() {
      this.triggerEvent
    }
  }
})
