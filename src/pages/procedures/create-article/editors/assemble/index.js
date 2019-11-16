import procedures from '../../../index'

Page({
  data: {
    images: [],

    layouts: [
      {
        id: 'verticle-half',
        rects: [
          {
            left: 0,
            top: 0,
            right: 750 / 2,
            bottom: 750
          },
          {
            left: 750 / 2,
            top: 0,
            right: 750,
            bottom: 750
          }
        ]
      }
    ],
    currentLayout: 0,

    path: '',
    sid: ''
  },

  ctx: null,

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const emitter = procedures.get(this.data.sid).register(this).asProcedure()
    emitter.on('init', data => {
      this.init(data)
    })
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  async init(images) {
    await this.initCanvas()
    try {
      // const images = await this.chooseImages()
      this.data.path = await this.drawImage(images)
    } catch (err) {
      console.log(err)
    }
  },

  /**
   * 选择图片
   */
  chooseImages() {
    return new Promise((resolve, reject) => {
      const count = this.data.layouts[this.data.currentLayout].rects.length
      wx.chooseImage({
        count,
        sizeType: ['original'],
        sourceType: ['album'],
        success: (res) => {
          this.setData({
            images: res.tempFiles
          })
          resolve(res.tempFiles)
        },
        fail: reject
      })
    })
  },

  /**
   * 初始化画布
   */
  initCanvas() {
    this.ctx = wx.createCanvasContext("canvas")

    const ww = wx.getSystemInfoSync().windowWidth
    const scaleRate = ww / 750
    this.ctx.scale(scaleRate, scaleRate)
  },

  /**
   * 绘图
   */
  drawImage(images) {
    return new Promise(async (resolve, reject) => {
      const layouts = this.data.layouts[this.data.currentLayout].rects

      if (images.length < 1) return;

      if (images.length === 1) {
        images[1] = images[0]
      }

      for (let i = 0; i < layouts.length; i++) {
        const dx = layouts[i].left
        const dy = layouts[i].top
        const dWidth = layouts[i].right - layouts[i].left
        const dHeight = layouts[i].bottom - layouts[i].top
        this.ctx.drawImage(images[i].path, dx, dy, dWidth, dHeight)
      }
      this.ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: (res) => {
            resolve(res.tempFilePath)
          }
        })
      })
    })
  },

  /**
   * 完成拼图
   */
  submit() {
    const emitter = procedures.get(this.data.sid).asProcedure()
    emitter.emit('getAssemble', this.data.path)
    emitter.emit('complete')
    wx.navigateBack({ delta: 1 })
  }
})
