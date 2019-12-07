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
      },
      {
        id: 'horizontal-half',
        rects: [
          {
            left: 0,
            top: 0,
            right: 750,
            bottom: 750 / 2,
          },
          {
            left: 0,
            top: 750 / 2,
            right: 750,
            bottom: 750,
          }
        ]
      },
      {
        id: 'diagonal',
        rects: [
          {
            left: 0,
            top: 0,
            bottom: 750 / 3 * 2,
            right: 750 / 2,
          },
          {
            left: 750 / 2,
            top: 750 / 3,
            bottom: 750,
            right: 750,
          }
        ]
      }
    ],
    currentLayout: 0,

    path: '',
    sid: '',
    canvas: {
      width: 0,
      height: 0,
    }
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
      this.setData({ images })
      this.data.path = await this.drawImage(images)
    } catch (err) {
      console.log(err)
    }
  },

  /**
   * 初始化画布信息
   */
  initCanvas() {
    this.ctx = wx.createCanvasContext("canvas")
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .select('#canvas')
        .boundingClientRect()
        .exec(res => {
          this.data.canvas.width = res[0].width
          this.data.canvas.height = res[0].height
          resolve()
        })
    })
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
   * 缩放画布
   */
  scaleCanvas() {
    const scaleRateW = this.data.canvas.width / 750
    const scaleRateH = this.data.canvas.height / 750
    this.ctx.scale(scaleRateW, scaleRateH)
  },

  /**
   * 绘图
   */
  drawImage(images) {
    return new Promise(async (resolve, reject) => {
      const layouts = this.data.layouts[this.data.currentLayout].rects
      this.ctx.clearRect(0, 0, this.data.canvas.width, this.data.canvas.height)

      if (images.length < 1) return;

      if (images.length === 1) {
        images[1] = images[0]
      }

      this.scaleCanvas()
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
  },

  async handleChangeLayout(e) {
    const index = e.currentTarget.dataset.index

    this.data.currentLayout = index
    this.data.path = await this.drawImage(this.data.images)
  }
})
