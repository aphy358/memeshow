var e = getApp();

Page({
  data: {
    articleImages: []
  },
  chooseCover: function (t) {
    var n = t.currentTarget.dataset.index, o = this.data.articleImages;
    if (o[n].selected) {
      o.forEach(function (e) {
        e.selected = !1;
      })
      o[n].selected = !0
      this.setData({
        articleImages: o
      })
      e.globalData.editCover = o[n].img
      wx.navigateBack()
    }
  },
  addImg: function () {
    var t = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (n) {
        wx.showLoading({
          title: "正在上传",
          mask: !0
        });
        var o = n.tempFilePaths;
        var a = t.data.articleImages;
        a.forEach(function (e) {
          e.selected = !1;
        })
        a.unshift({
          img: o[0],
          selected: !0
        })
        t.setData({
          articleImages: a
        })
        e.globalData.editCover = o[0] 
      },
      fail: function () {
        console.log("choose img fail");
      }
    });
  },

  onLoad: function (t) {
    var n = [], o = e.globalData.editCover;
    e.globalData.editArticleParaList.forEach(function (e) {
      e.img && "" !== e.img && n.push({
        img: e.img,
        selected: e.img === o
      });
    }) 
    -1 === e.globalData.editArticleParaList.findIndex(function (e) {
      return e.img === o;
    }) && n.unshift({
      img: o,
      selected: !0
    }) 
    this.setData({
      articleImages: n
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});