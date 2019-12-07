function e(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

var t, i = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t];
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }
  return e;
}, n = function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
}(require("../../utils/milk/index")), o = require("../../utils/util.js"), s = (require("../../utils/constants.js"),
  require("../../utils/storage.js"), require("../../model/feed.js"));
const a = require("../../model/recommend.js")
const d = require("../../model/topic.js")
const r = require("../../model/comment.js")
const h = require("../../utils/reporter").speed
const c = getApp()
const l = (c || {}).global || {}
let u = null, g = null, f = null, m = "none", p = !1, w = !1, x = !1, v = !1, y = !1, I = !1, C = 0, b = []
let L = void 0, P = void 0, T = void 0, S = void 0, k = void 0, D = void 0, F = !1, E = void 0, M = void 0
let q = void 0, B = void 0, H = ""
let N = {
  touchStart: +new Date()
}
let A = [], O = [], j = {};

try {
  S = wx.getSystemInfoSync()
  k = S.screenHeight
  D = S.screenWidth, parseInt(k / 3)
  B = S.system.search("iOS") >= 0
} catch (e) { }


Page({
  name: "feed",
  data: function () {
    return {
      mainPage: !0,
      pageHeight: k,
      pageWidth: D,
      feedList: [],
      feedIndex: 0,
      preloadedIndex: 1,
      animation: !1,
      transform: null,
      batchFeedIndex: [],
      comments: [],
      isShowComment: !1,
      isShowCommentLoaded: !1,
      isPlaying: !1,
      percent: 0,
      animationPrograss: {},
      animationMusic: {},
      showModal: !1,
      videoHidden: !1,
      isHide: !1,
      isIOS: B,
      isSyncFrame: !1,
      hasImageBug: !1,
      screenSize: {},
      forward: !1,
      from: ""
    };
  },
  preload: function (e) {
    return T = (e || {}).from || "", L = (e || {}).feedid || (e || {}).feed_id || "",
      P = (e || {}).topic_id || "", C = (e || {}).index || 0, c.minico.log("play page onload, feedId: " + L + ", from: " + T + ", pageHeight: " + k),
      new Promise(function (e, t) {
        !T || "personal" !== T && "topic" !== T ? (g = new a(), b = l.recommendData && l.recommendData.length ? l.recommendData.splice(-7, 7) || [] : [],
          c.minico.log("cacheList.length: " + b.length), g.init(), b.length ? e(b) : (o.loading("正在加载数据"),
            g.loadFeedList(null, !0).then(function (t) {
              o.loading(), b = b.concat(t && t.map(function (e) {
                return i({}, e);
              }) || []), c.minico.log("load feeds done, feedList.length: " + b.length), b.length ? e(b) : o.showErrTips("视频文件获取失败，请退出重试");
            }.bind(this), function (e) {
              o.loading(), -509 === e.ret ? o.showErrTips("手速很快呢，稍微休息下吧[" + e.ret + "]") : 100018 === e.ret || 100019 === e.ret || 100020 === e.ret ? o.showErrTips("微信小程序登录接口异常[" + e.ret + "]，请稍候重试访问") : o.showErrTips("服务器又调皮了，请稍候回来鞭策它~[" + e.ret + "]");
            }.bind(this)))) : "personal" === T ? (u = l.personal, b = u && u.feedsList.length ? (u.feedsList || []).map(function (e) {
              return i({}, e);
            }) : [], c.minico.log("cacheList.length: " + b.length), b.length ? e(b) : (o.loading("正在加载数据"),
              u.getPersonalDetail({
                getMore: !0,
                retuenNewFeed: !0
              }).then(function (t) {
                console.log("success", u), o.loading(), b = b.concat(feedList && feedList.map(function (e) {
                  return i({}, e);
                }) || []), c.minico.log("load feeds done, feedList.length: " + b.length), b.length ? e(b) : o.showErrTips("视频文件获取失败，请退出重试");
              }.bind(this), function (e) {
                console.error(e), o.loading(), -509 === res.ret ? o.showErrTips("手速很快呢，稍微休息下吧[" + res.ret + "]") : 100018 === res.ret || 100019 === res.ret || 100020 === res.ret ? o.showErrTips("微信小程序登录接口异常[" + res.ret + "]，请稍候重试访问") : o.showErrTips("服务器又调皮了，请稍候回来鞭策它~[" + res.ret + "]");
              }))) : "topic" === T && (f = l.topicData[P], b = f && f.feedList.length ? (f.feedList || []).map(function (e) {
                return i({}, e);
              }) : [], c.minico.log("cacheList.length: " + b.length), b.length ? e(b) : (o.loading("正在加载数据"),
                d.loadMoreFeeds(f).then(function () {
                  b = f.feedList.map(function (e) {
                    return i({}, e);
                  }) || [], c.minico.log("load feeds done, feedList.length: " + b.length), b.length ? e(b) : o.showErrTips("视频文件获取失败，请退出重试");
                }.bind(this), function (e) {
                  console.error(err), o.loading(), -509 === e.ret ? o.showErrTips("手速很快呢，稍微休息下吧[" + e.ret + "]") : 100018 === e.ret || 100019 === e.ret || 100020 === e.ret ? o.showErrTips("微信小程序登录接口异常[" + e.ret + "]，请稍候重试访问") : o.showErrTips("服务器又调皮了，请稍候回来鞭策它~[" + e.ret + "]");
                }.bind(this))));
      });
  },
  onLoad: function (e, t) {
    var i = this;
    c.minico.log("page onReady")
    this.isSyncFrame = -1 !== o.compareVersion(l.sysInfo.SDKVersion, "2.4.0") && "devtools" !== l.sysInfo.platform,
      t || (t = this.preload(e)), t.then(function () {
        i.from = T, j = {}, y = !0, i.initVideoContext(), i.showData();
      });
  },
  onReady: function () {
    I = !0, c.minico.log("page onReady")
    this.showData()
    wx.getNetworkType({
      success: function (e) {
        var t = this;
        m = e.networkType, c.minico.log("get network type success, network type: " + m),
          this.$nextTick(function () {
            t.checkNetwork();
          });
      }.bind(this),
      fail: function (e) {
        c.minico.log("get network type fail, res: " + JSON.stringify(e));
      }
    }), wx.onNetworkStatusChange(function (e) {
      m = e.isConnected ? e.networkType : "none", c.minico.log("network status change, network type: " + m),
        this.checkNetwork();
    }.bind(this));
  },
  showData: function () {
    var e = this, t = void 0;
    if (y && I) {
      if (I = !1, L || (L = b[C].id), (t = l.feedData[L]) && c.minico.log("load feed detail done, show data, video url: " + t.videoUrl),
        b.length) for (var i = 0, n = b.length; i < n; i++) if (b[i].id === L) {
          C = i;
          break;
        }
      var s = wx.createAnimation({
        duration: 0
      });

      s.translateY(-C * k).step()
      this.preloadedIndex = this.getPreloadedIndex()
      this.feedList = b
      this.mainPage = 1 === getCurrentPages().length
      this.feedIndex = C
      this.transform = s.export()
      this.initQueue(C), this.$nextTick(function () {
        e.$reportDataReady({
          id: "35",
           apn: m,
           platform: e.isIOS ? "ios" : "android",
          uin: l.weishiId && l.weishiId.personid
        });
       }), o.getWeishiId();
    }
  },
  initVideoContext: function () {
    A.push({});
  },
  loadCommentList: function () {
    var e = this.feedList[this.feedIndex].id
    let t = l.feedData[e]

    r.loadCommentList(t.id).then(function () {
      t.id === e && (o.loading(), this.comments = l.commentData[t.id] || [], this.isShowCommentLoaded = !0,
        this.isShowComment = !0);
    }.bind(this), function () {
      t.id === this.feedList[C].id && (o.loading(), this.comments = [], this.isShowCommentLoaded = !0,
        this.isShowComment = !0);
    }.bind(this));
  },
  onShow: function () {
    c.minico.log("page onShow, isHide: " + this.isHide + ", cacheList.length: " + b.length + ", feedIndex: " + C)
    if (this.isHide) {
      g && g.init(), 
      F = !1, 
      C = this.feedIndex
      this.videoPlay()
      if (!b.length) {
        c.minico.log("page relaunch")
        wx.reLaunch({
          url: "../index/index"
        })
      }
    } 
    
    this.isHide = false
  },
  onHide: function () {
    if (this.isPlaying) {
      this.videoStop()
    }
    this.isHide = true
  },
  bindTapModal: function (e) {
    "modal" === ((e.target || {}).dataset || {}).id && this.bindHideModal();
  },
  bindHideModal: function () {
    v = true
    this.bindClickVideo()
    this.showModal = false
    wx.reportAnalytics("hot_click", {
      event: "play.modal.hide",
      data: ""
    });
  },
  bindShowModal: function () {
    this.videoStop()
    this.showModal = true
    wx.reportAnalytics("hot_click", {
      event: "play.modal.show",
      data: ""
    });
  },
  timeupdate: function (e) {
    var t = e.currentTarget.id.split("-")[1];
    if (this.batchFeedIndex[t] === this.feedIndex) { 
      this.prograss(e)
      this.setPrograss(e.detail.currentTime / e.detail.duration * 100)
      if (q) {
        clearTimeout(q)
        q = null
        wx.hideLoading()
      }
     } else {
       this.stop(this.getContextByIdx(t));
     } 
  },
  prograss: function (e) {
    var t = e.currentTarget.id.split("-")[1];
    this.batchFeedIndex[t] === this.feedIndex ? this.getCurrentContext().played && (this.videoHidden = !1,
      this.videoPlaying(), v = !1) : this.stop(this.getContextByIdx(t));
  },
  nil: function () { },
  stop: function (e) {
    if (e) {
      e.played = false
      e.isPlaying = false
      e.pause()
    }
  },
  videoStop: function (e) {
    var t = this.stop;
    if (e) {
      t(this.getContextByIdx(0))
      t(this.getContextByIdx(1))
      t(this.getContextByIdx(2))
    } else {
      t(this.getCurrentContext())
    }
    this.isPlaying = false
    v = true
  },
  videoPlaying: function () {
    if (!this.getCurrentContext().isPlaying) {
      this.isPlaying = !0, this.getCurrentContext().isPlaying = !0;
      var e = +new Date();
      c.minico.log("play time is " + (e - N.touchStart) + "ms"), j[this.data.feedList[C].id] || (h.reportPlayTime({
        time: e - N.touchStart,
        apn: m,
        platform: this.isIOS ? "ios" : "android",
        uin: l.weishiId && l.weishiId.personid
      }), j[this.data.feedList[C].id] = !0);
      for (var t = wx.createAnimation({
        duration: 2e3,
        timingFunction: "linear"
      }), i = 0; i < 10; i++) t.rotate(180 * i).step();
      this.animationMusic = t.export();
    }
  },
  videoPlay: function (e, t) {
    if (e) {
      var i = e.currentTarget.id.split("-")[1];
      if (this.batchFeedIndex[i] !== this.feedIndex) return void this.getContextByIdx(i).pause();
    }
    var n = this.getCurrentContext();
    F || n && !n.played && (this.isPlaying = !0, n.play(), n.played = !0, !0 === t && (this.resetPrograss(),
      n.seek(0)));
  },
  startPlay: function () {
    N.touchStart = +new Date(), this.isPlaying || this.videoPlay();
  },
  resetPrograss: function () {
    var e = wx.createAnimation({
      duration: 0,
      timingFunction: "linear"
    });
    e.width("0%").step(), this.animationPrograss = e.export();
  },
  setPrograss: o.throttle(function (e) {
    var t = void 0;
    (t = 0 === e ? wx.createAnimation({
      duration: 0,
      timingFunction: "linear"
    }) : wx.createAnimation({
      duration: 800,
      timingFunction: "linear"
    })).width(e + "%").step(), this.animationPrograss = t.export();
  }, 800),
  bindShowComment: function () {
    var e = this.feedList[C].id;
    l.commentData[e] ? (this.comments = l.commentData[e] || [], this.isShowComment = !0,
      this.isShowCommentLoaded = this.isShowCommentLoaded) : (o.loading("正在加载评论"), this.loadCommentList());
  },
  bindHideComment: function () {
    this.isShowComment = !1;
  },
  bindCommentListTap: function (e) {
    "commentList" === ((e.target || {}).dataset || {}).id && (this.isShowComment = !1);
  },
  bindLike: function () {
    var e = this.feedList[C].id;
    e ? s.dingFeed(e).then(function () {
      this.feedList[this.feedIndex].dingCount = l.feedData[e].dingCount, this.feedList[this.feedIndex].isDing = l.feedData[e].isDing;
    }.bind(this), function (e) {
      o.showErrTips("服务器又调皮了，请稍候回来鞭策它~[" + e.ret + "]");
    }) : o.showErrTips("点赞失败，请稍候重试[" + e + "]");
  },
  bindCommentLike: function (e) {
    var t = (e.currentTarget || {}).dataset || {}, i = t.feedId || "", n = t.commentId || "";
    i && n ? r.dingComment(i, n).then(function () {
      this.comments = l.commentData[i];
    }.bind(this), function (e) {
      o.showErrTips("服务器又调皮了，请稍候回来鞭策它~[" + e.ret + "]");
    }) : o.showErrTips("点赞失败，请稍候重试[" + i + "-" + n + "]");
  },
  bindClickVideo: function (e) {
    var t = void 0;
    p ? (clearTimeout(p), p = !1, t = this.feedList[C], c.minico.log("video double tap, isDing: " + !t.isDing),
      t.isDing || this.bindLike()) : p = setTimeout(function () {
        p = !1;
        var e = !this.getCurrentContext().isPlaying;
        e && !F ? this.videoPlay() : this.videoStop(), c.minico.log("video status change, is pause: " + e);
      }.bind(this), 300);
  },
  saveAlbum: function () {
    wx.canIUse("saveImageToPhotosAlbum") ? (o.loading("正在保存文件"), o.trySave2Album().then(function () {
      wx.downloadFile({
        url: "https://qzonestyle.gtimg.cn/qz-proj/weishi-miniprogram/img/topic/qrcode.png",
        success: function (e) {
          wx.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function (e) {
              o.showTips("二维码已保存到相册"), c.minico.log("qrcode save to album");
            },
            fail: function (e) {
              -1 === e.errMsg.search("cancel") ? (o.showErrTips({
                title: JSON.stringify(e || "保存二维码失败")
              }), c.minico.log("qrcode cancel save")) : (o.loading(), c.minico.log("qrcode save fail, res: " + JSON.stringify(e)));
            }
          });
        },
        fail: function (e) {
          o.showErrTips({
            title: "二维码文件下载失败"
          }), c.minico.log("qrcode download fail, res: " + JSON.stringify(e));
        }
      });
    }.bind(this), function () {
      o.showAuthorizeTips(), c.minico.log("qrcode save fail by authorize");
    }), o.hotClick("save.album")) : o.showVersionTips();
  },
  bindTopicTap: function (e) {
    var t = (e.currentTarget || {}).dataset || {};
    c.minico.log("navigate to topic page, topic id: " + t.topicId), o.navigateTo("../topic/topic?topic_id=" + t.topicId);
  },
  bindCommentInput: function (e) {
    H = e.detail.value;
  },
  bindCommentConfirm: function () {
    var e = this.feedList[C];
    H = H.trim(), o.loading("正在添加评论"), r.addComment(e.id, H).then(function () {
      H = "", this.feedList[C] = l.feedData[e.id], this.comments = l.commentData[e.id] || [],
        this.commentText = "", o.loading();
    }.bind(this), function (e) {
      o.showErrTips("服务器又调皮了，请稍候回来鞭策它~[" + e.ret + "]");
    });
  },
  bindReturn: function (e) {
    c.minico.log("navigate back"), wx.navigateBack(), wx.reportAnalytics("hot_click", {
      event: "play.return.topic",
      data: ""
    });
  },
  checkNetwork: function () {
    if ("wifi" !== m && !w) {
      w = !0, c.minico.log("show network tips");
      var e = "none" === m ? "网络异常，请检查网络后再重试" : "当前处于非WIFI环境，是否流量观看";
      return this.videoStop(), wx.showModal({
        title: "提示",
        content: e,
        showCancel: !0,
        success: function (e) {
          x = e.confirm, e.confirm && this.videoPlay();
        }.bind(this),
        fail: function () { }
      }), !1;
    }
    return "wifi" !== m || ("wifi" === m && (x = !0), !0);
  },
  gotoPersonal: function (e) {
    this.videoStop(!0);
    var t = o.getPageDeep(), i = o.getReturnPage();
    2 == t && i.indexOf("personal") >= 0 ? wx.navigateBack() : this.$navigateTo({
      url: "../personal/personal?personid=" + e.currentTarget.dataset.personid
    });
  },
  checkNextFeed: function () {
    var e = this;
    c.minico.log("page check next feed, feedIndex: " + C + ", feedList.length: " + this.feedList.length);
    var t = this.from;
    this.feedList[C + 7] || (t && "home" != t ? "personal" == t ? u.getPersonalDetail({
      getMore: !0,
      retuenNewFeed: !0
    }).then(this.bindNewFeed, function (e) { }) : "topic" === t && d.loadMoreFeeds(f).then(function () {
      e.feedList = f.feedList.map(function (e) {
        return i({}, e);
      }) || [];
    }) : g.loadFeedList().then(this.bindNewFeed, function (e) { }));
  },
  bindNewFeed: function (e) {
    this.feedList.length;
    e && e.length && (this.feedList = this.feedList.concat(e.map(function (e) {
      return i({}, e);
    })));
  },
  touchStart: function (e) {
    E = e.changedTouches[0] || {};
  },
  touchEnd: function (e) {
    if (console.log("touch end trigger, scroll lock: " + F), !F) {
      var t = !0;
      (M = e.changedTouches[0] || {}).clientY - E.clientY < 0 ? (C = Math.min(this.feedIndex + 1, this.feedList.length - 1),
        c.minico.log("feed video slide next")) : M.clientY - E.clientY > 0 && (C = Math.max(this.feedIndex - 1, 0),
          t = !1, c.minico.log("feed video slide prev")), C !== this.feedIndex && (this.isShowComment = !1,
            this.videoStop(!0), F = !0, this.changeData(t), c.minico.log("feed video: " + this.feedList[C].videoUrl));
    }
  },
  getPreloadedIndex: function () {
    return C + 3 > this.preloadedIndex ? C + 3 : this.preloadedIndex;
  },
  getContextByIdx: function (idx) {
    let t = A[A.length - 1]["video" + idx]
    if (t) {
      return t
    }
    t = A[A.length - 1]["video" + idx] = wx.createVideoContext("video-" + e)
    t.isPlaying = false,
    t.played = false
    return t
  },
  getCurrentContext: function () {
    let e = this.feedIndex
    return e === this.batchFeedIndex[0] ? 
      this.getContextByIdx(0) : e === this.batchFeedIndex[1] ? 
        this.getContextByIdx(1) : e === this.batchFeedIndex[2] ? 
          this.getContextByIdx(2) : null
  },
  end: function () {
    var e = this
    t = this.batchFeedIndex
    i = -1

    this.preloadedIndex = this.getPreloadedIndex()
    this.animation = false
    this.resetPrograss()
    this.forward ? ~t.indexOf(C + 1) || (i = O[O.length - 1].out(), t[i] = C + 1) : ~t.indexOf(C - 1) || (i = O[O.length - 1].out(!0),
        t[i] = C - 1), F = !1, this.feedIndex = C, this.videoPlay(null, !0), this.$nextTick(function () {
          e.batchFeedIndex = [].concat(t), e.checkNextFeed();
        });
  },
  changeData: function (e) {
    var t = wx.createAnimation({
      duration: 350,
      timingFunction: "ease-out"
    });
    t.translateY(-C * k).step()
    this.animation = true
    this.transform = t.export()
    this.videoHidden = true
    this.isPlaying = false
    this.isPause = false
    this.forward = e;
  },
  touchCancel: function () {
    console.log("touchCancel");
  },
  calBatchIndex: function (e) {
    return e - 1 < 0 ? [0, 1, 2] : [e - 1, e, e + 1];
  }
}, e(t, "calBatchIndex", function (e) {
  return e - 1 < 0 ? [0, 1, 2] : [e - 1, e, e + 1];
}), e(t, "initQueue", function (e) {
  var t = new o.LoopQue();
  t.in(0), t.in(1), t.in(2), O.push(t), this.batchFeedIndex = this.calBatchIndex(e);
}), e(t, "onUnload", function () {
  A.pop(), O.pop();
}), t);