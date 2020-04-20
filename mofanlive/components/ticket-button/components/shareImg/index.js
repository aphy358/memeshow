Component({
  properties: {
    image: {
      type: String,
      value: ""
    },
    show: {
      type: Boolean,
      value: !1
    }
  },

  data: {
    showImgAuth: !1
  },

  methods: {
    click: function() {
      this.triggerEvent("close")
    },

    onSave: function(t) {
      function fail() {
        wx.showToast({
          title: "保存图片失败",
          icon: "none"
        })
      }

      wx.downloadFile({
        url: "https://cos.ap-guangzhou.myqcloud.com/mofanshow-avatar-1252461817/wx8fba36125c622563.o6zAJs2-ytkTcFWlildF1ZHipNKY.rZN3s0rss9zC23f6f35d5ce4450b97eecb0fd593cfd6.png",
        success(res) {
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({
                  title: "保存成功，快去分享给朋友",
                  icon: "none"
                })
              },
              fail
            })
          }
        },
        fail
      })
    },

    handleSetting: function(t) {
      this.setData({ showImgAuth: !1 })
    },

    move: function() {}
  }
})
