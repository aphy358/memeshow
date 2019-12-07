import procedures from '../index'

Page({
  data: {
    recording: false,
    devicePos: 'back',
    flash: 'off',

    sid: '',
    safeBottom: 0,
    safeTop: 0,
  },
  onLoad(options) {
    this.data.sid = options.sid

    const sys = wx.getSystemInfoSync()
    this.setData({
      safeTop: sys.safeArea.top,
      safeBottom: sys.screenHeight - sys.safeArea.bottom
    })
  },
  onReady() {
    procedures.get(this.data.sid).register(this)
  },
  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 点击相册
   */
  handleAlbums() {
    wx.chooseVideo({
      sourceType: ['album'],
      success: (res) => {
        wx.showLoading({
          title: '正在上传'
        })

        // todo upload video

        setTimeout(() => {
          wx.hideLoading()
          wx.navigateTo({
            url: `./editor/index?sid=${this.data.sid}&path=${res.tempFilePath}`
          })
        }, 2000)
      }
    })
  },

  /**
   * 点击录制键
   */
  handleRecord() {
    const ctx = wx.createCameraContext()
    if (this.data.recording) {
      wx.showToast({
        title: 'end'
      })
      ctx.stopRecord({
        success: (res) => {
          wx.navigateTo({
            url: `./editor/index?sid=${this.data.sid}&path=${res.tempVideoPath}`
          })
        },
        fail: (res) => {
          wx.showToast({
            title: "录制时间过短"
          })
        },
        complete: (res) => {
          this.setData({
            recording: false
          })
        }
      })
    } else {
      wx.showToast({
        title: 'start'
      })
      ctx.startRecord()
      this.setData({
        recording: true
      })
    }
  },

  /**
   * 翻转镜头
   */
  handleTurnCamera() {
    if (this.data.devicePos === 'back') {
      this.setData({ devicePos: 'front' })
    } else {
      this.setData({ devicePos: 'back' })
    }
  },

  /**
   * 开关闪光灯
   */
  handleFlash() {
    if (this.data.flash === 'on') {
      this.setData({ flash: 'off' })
    } else {
      this.setData({ flash: 'on' })
    }
  },

  /**
   * 返回上一层
   */
  handleNavBack() {
    wx.navigateBack({ delta: 1 })
  }
})