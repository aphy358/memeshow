import WeCropper from './we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    // 裁剪后设置到 storage 里的 key
    storage: '',

    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      },
      boundStyle: {
        color: '#04b00f',
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    }
  },
  touchStart (e) {
    this.cropper.touchStart(e)
  },
  touchMove (e) {
    this.cropper.touchMove(e)
  },
  touchEnd (e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage () {
    const self = this

    this.cropper.getCropperImage(function (path, err) {
      if (err) {
        wx.showModal({
          title: '温馨提示',
          content: err.message
        })
      } else {
        wx.setStorageSync(self.data.storage, path)
        wx.navigateBack({
          delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        });
      }
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.cropper.pushOrign(src)
      }
    })
  },
  onLoad ({ src, storage = 'cropperPath' }) {
    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = '#04b00f'

    this.setData({ cropperOpt, storage })

    if (src) {
      cropperOpt.src = src
      this.cropper = new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
    }
  }
})
