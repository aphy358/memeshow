import { connectComponent } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
import Action from '@/redux/action'
const Api = wx.X.Api

const Point = function (x, y) {
  return { x: x, y: y };
};

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  behaviors: [computedBehavior],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },

  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: 'togglePoster'
    }
  },

  data: {
    // 是否显示弹框
    ifShowPop: false,

    shareImgPath: '',

    // 上一次的海报图片
    lastShareImg: '',

    imgReady: false,

    // 主播图片
    img1: '',

    // 头像
    img2: '',

    // 小程序码
    img3: '',

    bounceClazz: ''

  },

  watch: {
    img1(newVal, oldVal) {
      if (newVal) this.makeCanvas()
    },

    img2(newVal, oldVal) {
      if (newVal) this.makeCanvas()
    },

    img3(newVal, oldVal) {
      if (newVal) this.makeCanvas()
    },
  },

  methods: {
    // 制作 canvas
    makeCanvas(e) {
      // 这里要一个小异步才能拿到所有数据，不然总有那个一个数据取不到
      setTimeout(() => {
        const { img1, img2, img3 } = this.data

        if (img1 && img2 && img3) {
          var ctx = wx.createCanvasContext('share', this)

          ctx.save()
          // 画外框
          this.drawRoundedRect({
            x: 0,
            y: 0,
            width: 300,
            height: 420
          }, 20, ctx)
          ctx.clip()
          ctx.setFillStyle('#fff')
          ctx.fill()

          // 画主播图片
          ctx.drawImage(img1, 0, 0, 300, 300)
          ctx.restore()
          ctx.save()

          // 画顶部 ‘45467人在看’
          var widthOfTag1 = 63    // '直播中' 标签长度
          ctx.font = 'normal 12px sans-serif'
          var textWidth = ctx.measureText('45467人在看').width
          this.drawRoundedRect({
            x: widthOfTag1,
            y: 15,
            width: textWidth + 32,
            height: 22
          }, 6, ctx)
          ctx.clip()
          ctx.setGlobalAlpha(0.5)
          ctx.setFillStyle('#000')
          ctx.fill()
          ctx.setGlobalAlpha(1)
          ctx.setFillStyle('#fff')
          ctx.fillText("45467人在看", 23 + widthOfTag1, 31)
          ctx.restore()
          ctx.save()

          // '直播中'
          this.drawRoundedRect({
            x: 15,
            y: 15,
            width: widthOfTag1,
            height: 22
          }, 6, ctx)
          ctx.clip()
          ctx.setFillStyle('#FE2C54')
          ctx.fill()
          ctx.font = 'normal 12px sans-serif'
          ctx.setFillStyle('#fff')
          ctx.fillText("直播中", 23, 31)
          ctx.restore()
          ctx.save()

          // 画小圆
          this.drawRoundedRect({
            x: 63,
            y: 22,
            width: 8,
            height: 8
          }, 4, ctx)
          ctx.clip()
          ctx.setFillStyle('#fff')
          ctx.fill()
          ctx.restore()
          ctx.save()

          // 画头像
          this.drawRoundedRect({
            x: 10,
            y: 310,
            width: 30,
            height: 30
          }, 15, ctx)
          ctx.clip()
          ctx.drawImage(img2, 10, 310, 30, 30)
          ctx.restore()
          ctx.save()

          // 画分享人
          ctx.font = 'normal 12px sans-serif'
          ctx.setFillStyle('#333')
          ctx.fillText("小姐姐", 50, 330)

          // 画直播间简介，如果太长，则分两行画
          var text = '今天工厂甩货度。。。今天工厂甩货度。。。今天工厂甩货度。。。'
          var text1 = ''
          var text2 = ''

          ctx.font = 'normal bold 16px sans-serif'
          ctx.setFillStyle('#454545')
          var metrics = ctx.measureText(text)
          if (metrics.width > 200) {
            for (var i = 10; i < text.length; i++) {
              var metrics = ctx.measureText(text.substring(0, i))
              if (metrics.width >= 200) {
                i--
                break
              }
            }

            text1 = text.substring(0, i)
            text2 = text.substring(i)

            if (text2.length >= 10) {
              text2 = text2.substring(0, 10) + '...'
            }
          } else {
            text1 = text
          }

          if (text2 != '') {
            ctx.fillText(text1, 10, 365)
            ctx.fillText(text2, 10, 390)
          } else {
            ctx.fillText(text1, 10, 375)
          }
          ctx.save()

          // 画小程序码
          ctx.drawImage(img3, 215, 310, 75, 75)

          // 画 '长按前往观看'
          this.drawRoundedRect({
            x: 210,
            y: 388,
            width: 80,
            height: 22
          }, 11, ctx)
          ctx.clip()
          ctx.setFillStyle('#FE2C54')
          ctx.fill()
          ctx.setFillStyle('#fff')
          ctx.setTextAlign('center')
          ctx.font = 'normal 12px sans-serif'
          ctx.fillText('长按前往观看', 250, 403)

          ctx.draw(true, setTimeout(() => {
            this.canvasToTempFilePath()
          }, 100))
        }
      }, 100);
    },

    // 切换海报的显示与隐藏
    togglePoster(newVal, oldVal) {
      if (newVal) {
        this.downLoadImgs()
      }
    },

    // 下载所有制作 canvas 需要的图片
    downLoadImgs() {
      wx.showLoading({
        title: '生成海报...',
      })

      const _this = this

      // 下载商品临时图片
      wx.downloadFile({
        url: 'http://i2.w.yun.hjfile.cn/doc/201303/54c809bf-1eb2-400b-827f-6f024d7d599b_01.jpg',
        success(res) {
          if (res.statusCode === 200) {
            _this.setData({ img1: res.tempFilePath })
          } else {
          }
        },
        fail(e) {
          wx.showToast({
            title: JSON.stringify(e),
            duration: 20000,
            icon: 'none',
          })
        }
      })

      // 模拟下载小程序码临时图片
      setTimeout(() => {
        wx.downloadFile({
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576911606212&di=6d4bc81dd5405c02256cc1ff1dc3d002&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2018-4%2F2018040318142365848.jpg',
          success(res) {
            if (res.statusCode === 200) {
              _this.setData({ img3: res.tempFilePath })
            }
          }
        })
      }, 1000);

      // 下载头像临时图片
      wx.downloadFile({
        url: 'https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg',
        success(res) {
          if (res.statusCode === 200) {
            _this.setData({ img2: res.tempFilePath })
          }
        }
      })
    },

    // 画圆角矩形
    drawRoundedRect(rect, r, ctx) {
      var ptA = Point(rect.x + r, rect.y);
      var ptB = Point(rect.x + rect.width, rect.y);
      var ptC = Point(rect.x + rect.width, rect.y + rect.height);
      var ptD = Point(rect.x, rect.y + rect.height);
      var ptE = Point(rect.x, rect.y);

      ctx.beginPath();

      ctx.moveTo(ptA.x, ptA.y);
      ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
      ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
      ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
      ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
    },

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
      if (this.data.shareImgPath) {
        let _this = this

        wx.showLoading({
          title: '图片保存中...'
        })
        wx.saveImageToPhotosAlbum({
          filePath: this.data.shareImgPath,
          success(res) {
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) {
                  _this.hidePoster()
                }
              },
              fail: function (res) { }
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          complete: function () {
            wx.hideLoading()
          }
        })
      } else {
        var _this = this
        setTimeout(function () {
          _this.savePic()
        }, 100)
      }
    },

    // 将 canvas 转图片
    canvasToTempFilePath() {
      var _this = this
      wx.canvasToTempFilePath({
        canvasId: 'share',
        success: function (res) {
          _this.setData({
            shareImgPath: res.tempFilePath,
            lastShareImg: res.tempFilePath,
            imgReady: true,
            ifShowPop: true,
            bounceClazz: 'bounce-in'
          })
          wx.hideLoading()
        },
        fail: function (res) {
        }
      }, _this);
    },

    // 隐藏海报
    hidePoster() {
      this.resetCanvas()
      wx.hideLoading()
      this.setData({
        ifShowPop: false,
        bounceClazz: 'bounce-out'
      })
      this.triggerEvent('hidePoster')
    },

    // 重置 Canvas
    resetCanvas() {
      var _this = this
      setTimeout(function () {
        _this.setData({
          imgReady: false,
          img1: '',
          img2: '',
          img3: '',
          // shareImgPath: '../../assets/loading.gif',
        })
      }, 300)
    }

  },

  lifetimes: {
    ready() {
    },
    attached() {
    },
    detached() {
    }
  },
}))