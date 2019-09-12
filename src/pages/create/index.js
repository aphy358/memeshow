Page({
  data: {
    isIn: !1
  },
  onLoad: function () {
    // wx.hideTabBar()
    wx.setStorage({
      key: "isShowCreateTips",
      data: !1
    });
  },
  addImg: function () {
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        wx.reportAnalytics && wx.reportAnalytics("start_article", {});
        var o = JSON.stringify(e.tempFilePaths);
        wx.getNetworkType({
          success: function (e) {
            console.log('networkType:', e.networkType)
            "none" === e.networkType ? wx.showModal({
              content: "当前网络不可用",
              showCancel: !1,
              confirmColor: "#2F92FF"
            }) : wx.navigateTo({
              url: "./editor?temp_file_paths=" + o
            });
          }
        });
      },
      fail: function () {
        console.log("choose img fail");
      },
      complete: function () {
        console.log("complete");
      }
    });
  },

  addArticle: function (e) {
    wx.navigateTo({
      url: "./editor"
    });
  },

  addLive: function () {
    wx.navigateTo({
      url: "../live/index"
    });
  },
  addText: function (o) {
    var t = [], a = {
      img: "",
      text: "",
      type: 0,
      adding: !1
    };
    t.splice(0, 0, a), this.setData({
      paraList: t
    });
    wx.navigateTo({
      url: "./text?index=0&frompost=1"
    });
  },
  addVideo: function (e) {
    wx.chooseVideo({
      sourceType: ["album", "camera"],
      maxDuration: 60,
      camera: "back",
      success: function (e) {
        if (e.duration < 3) {
          wx.showModal({
            title: "视频长度至少3秒，请重新选择",
            confirmColor: "#2F92FF",
            showCancel: !1
          })
        } else if (e.duration > 180) {
          wx.showModal({
            title: "视频长度最多3分钟，请重新选择",
            confirmColor: "#2F92FF",
            showCancel: !1
          })
        } else {
          var o = e.tempFilePath;
          wx.getNetworkType({
            success: function (e) {
              "none" !== e.networkType ? wx.showModal({
                content: "当前网络不可用",
                showCancel: !1,
                confirmColor: "#2F92FF"
              }) : wx.navigateTo({
                url: "./editor?video_file_path=" + o
              });
            }
          });
        }
      },
      fail: function (e) { }
    });
  },
  getFormIdAndNotNav: function (t) {

  },

  closePageHandle: function (e) {
    // wx.showTabBar({
    //   success: function () {
    wx.switchTab({
      url: "../index/index",
    })
    //   }
    // })
  },

  onShow: function () {

  },
  onUnload: function () {
  },
  onHide: function () {
    // wx.showTabBar()    
  }
});