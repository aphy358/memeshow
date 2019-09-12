var t = getApp();

Page({
  data: {
    index: 0,
    inputLen: 0,
    maxLen: 5000,
    content: "",
    error: !1
  },
  oninput: function (t) {
    var a = t.detail.value;
    this.setData({
      inputLen: a.length
    }) 
    a.length > this.data.maxLen ? this.setData({
      error: !0
    }) : this.setData({
      error: !1
    });
  },
  onconfirm: function (a) {
    
    var e = a.detail.value;
    this.data.error ? wx.showModal({
      title: "段落最多" + this.data.maxLen + "个字",
      confirmColor: "#2F92FF",
      confirmText: "去修改",
      showCancel: !1
    }) : (wx.showModal({
      title: '敬请期待',
      content: '逻辑进一步完善',
    }))
  },
  onLoad: function (a) {
    
  },
  onReady: function () {
    
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});