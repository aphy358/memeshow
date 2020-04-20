import { connectComponent } from "wx-redux"
import computedBehavior from 'miniprogram-computed'


const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})


/**
 * 分享海报
 */
Component(connectComponent(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },

  properties: {
    image: {
      type: String,
      value: ""
    },
  },

  data: {
    tmpImagePath: '',

    show: false,
  },

  watch: {
    // 当获取到视频的播放宽度的时候
    image(newVal, oldVal) {
      if (newVal) {
        const _this = this

        wx.showLoading({
          title: '正在生成...'
        })

        if (newVal) {
          wx.downloadFile({
            url: newVal, //仅为示例，并非真实的资源
            success (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                _this.setData({ tmpImagePath: res.tempFilePath, show: true })
              }
            },
            fail (err) {
              console.log('err', err);
            },
            complete(res) {
              wx.hideLoading()
            }
          })
        }
      }
    },
  },

  methods: {

    // 保存图片到系统相册（授权）
    saveImageToPhotos() {
      let self = this

      // 相册授权
      wx.getSetting({
        success(res) {
          // 进行授权检测，未授权则进行弹层授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                self.savePic()
              },
              // 拒绝授权时，则进入手机设置页面，可进行授权设置
              fail() {
                wx.openSetting({
                  success: function (data) {
                    console.log("openSetting success");
                  },
                  fail: function (data) {
                    console.log("openSetting fail");
                  }
                });
              }
            })
          } else {
            // 已授权则直接进行保存图片
            self.savePic()
          }
        },
        fail(res) {
          wx.showToast({
            title: '授权失败',
          })
        }
      })
    },

    // 将 canvas 保存为图片
    savePic() {
      const { tmpImagePath } = this.data
      let _this = this

      if (tmpImagePath) {
        wx.showLoading({
          title: '图片保存中...'
        })

        wx.saveImageToPhotosAlbum({
          filePath: tmpImagePath,
          success(res) {
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) {
                  _this.close()
                }
              },
              fail: function (res) { }
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败',
            })
          },
          complete: function () {
            wx.hideLoading()
          }
        })
      }
    },

    // 隐藏海报
    close() {
      wx.hideLoading()
      this.setData({ show: false })
      this.triggerEvent('close')
    },

  },

  lifetimes: {
    attached() {
    },
    detached() {
    }
  },
}))