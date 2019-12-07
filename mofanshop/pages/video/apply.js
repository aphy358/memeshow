//获取应用实例
const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    title: null,
    filePath: '/image/plus.png'
  },
  onLoad: function () {
   
  },

  bindKeyInput: function (e) {
    this.setData({
      subjectTitle : e.detail.value
    })
  },

  chooseImage: function (e) {
    var that = this;

    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          filePath: tempFilePaths[0]
        })
      }
    })
  },

  applySubject: function (e) {
    var that = this;
    var tempFilePath = this.data.filePath;

    if (tempFilePath == '/image/plus.png') {
      wx.showToast({
        title: "请选择图片"
      })
      return;
    }

    var title = that.data.subjectTitle;
    if (title == null) {
      wx.showToast({
        title: "请描述下内容"
      })
      return;
    }

    // 发布说说
    api.applySubject({
      filePath: tempFilePath,
      formData: {
        title: title
      },
      success: function (data) {
        wx.reLaunch({
          url: 'subject',
        })
      }
    })
  }
})
