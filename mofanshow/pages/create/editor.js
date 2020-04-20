var t = getApp()
Page({
  data: {
    title: "",
    cover: "",
    editImgLength: 0,
    editVideoLength: 0,
    music: {},
    paraList: [],
    submitClicked: !1,
    phone: "",
    postSuccess: !1,
    removeDraftClicked: !1,
    SomethingTapped: !1,
    animationData: {},
    addPanelTop: null,
    addPanelBottom: null,
    curIndex: -1,
    showTitleLead: !1,
    isShowEditImgTips: !1,
    editImgTipsIndex: "null"
  },
  delPara: function(a) {
    var i = this,
      e = a.currentTarget.dataset.index
    this.data.paraList[e].img &&
    "" !== this.data.paraList[e].img &&
    1 ===
      this.data.paraList.filter(function(t) {
        return t.img && "" !== t.img
      }).length
      ? wx.showModal({
          title: "至少要保留一张图片",
          confirmColor: "#2F92FF",
          showCancel: !1
        })
      : wx.showModal({
          title: "确定删除此段？",
          confirmColor: "#2F92FF",
          success: function(a) {
            if (a.confirm) {
              var n = i.data.paraList,
                o = n[e].img
              n.splice(e, 1)
              i.setData({
                paraList: n
              })
              t.globalData.editArticleParaList = n
              if (i.data.cover === o) {
                const s = n.find(function(t) {
                  return t.img && "" !== t.img
                })
                i.setData({
                  cover: s.img
                })
              }
            }
          }
        })
  },
  pullUp: function(a) {
    var i = a.currentTarget.dataset.index
    if (0 !== i) {
      var e = t.globalData.editArticleParaList,
        n = e[i]
      e[i] = e[i - 1]
      e[i - 1] = n
      this.setData({
        paraList: e
      })
      t.globalData.editArticleParaList = e
    }
  },
  pullDown: function(a) {
    var i = a.currentTarget.dataset.index,
      e = t.globalData.editArticleParaList
    if (i !== e.length - 1) {
      var n = e[i]
      e[i] = e[i + 1]
      e[i + 1] = n
      this.setData({
        paraList: e
      })
      t.globalData.editArticleParaList = e
    }
  },
  expandAdd: function(t) {
    var a = t.currentTarget.dataset.index,
      i = null,
      e = null
    this.animation = null
    if (a == -1) {
      this.animation = wx.createAnimation({
        duration: 150,
        timingFunction: "ease",
        transformOrigin: "0 0"
      })
    } else {
      this.animation = wx.createAnimation({
        duration: 150,
        timingFunction: "ease",
        transformOrigin: "0 100%"
      })
      i = t.currentTarget.offsetTop - Math.round(120 * this.dpr)
      if (a == -2) {
        a = this.data.paraList.length - 1
        i = null
        e = 260
      }
    }
    this.animation.scale(1, 1).step(),
      this.setData({
        curIndex: a,
        addPanelTop: i,
        addPanelBottom: e,
        animationData: this.animation.export()
      })
    this.isCloseAddPanel = !1
  },
  closeAddPanel: function() {
    this.animation.scale(0, 0).step()
    this.setData({
      animationData: this.animation.export()
    })
    this.isCloseAddPanel = !0
  },
  editTitle: function() {
    if (!this.data.SomethingTapped) {
      this.setData({
        SomethingTapped: !0
      })
      t.globalData.editArticleTitle = this.data.title
      wx.navigateTo({
        url: "./text"
      })
    }
  },
  editPara: function(t) {
    if (!this.data.SomethingTapped) {
      var a = t.currentTarget.dataset,
        i = a.index,
        e = a.type || null
      if (6 == e) {
        return (
          wx.showToast({
            title: "暂不支持编辑小标题",
            icon: "none"
          }),
          !1
        )
      }
      this.setData({
        SomethingTapped: !0
      })
      wx.navigateTo({
        url: "./text"
      })
    }
  },
  addText: function(a) {
    if (this.data.paraList.length >= 150) {
      wx.showModal({
        title: "最多支持150个段落",
        confirmColor: "#2F92FF",
        showCancel: !1
      })
    } else {
      var i = this.data.curIndex,
        e = this.data.paraList
      this.closeAddPanel()
      var n = {
        img: "",
        text: "",
        type: 1,
        adding: !1
      }
      e.splice(i + 1, 0, n)
      this.setData({
        paraList: e
      })
      t.globalData.editArticleParaList = e
      wx.navigateTo({
        url: ""
      })
    }
  },
  addImg: function(a) {
    var i = this
    if (this.data.paraList.length >= 150) {
      wx.showModal({
        title: "最多支持150个段落",
        confirmColor: "#2F92FF",
        showCancel: !1
      })
    } else {
      var e = this.data.paraList.filter(function(t) {
        return t.img && "" !== t.img
      })
      if (e.length >= 100) {
        wx.showModal({
          title: "最多支持100个图片段落",
          confirmColor: "#2F92FF",
          showCancel: !1
        })
      } else {
        var n = 100 - e.length > 9 ? 9 : 100 - e.length,
          o = this.data.curIndex
        wx.chooseImage({
          count: n,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: function(a) {
            var e = t.globalData.editArticleParaList || []
            i.closeAddPanel()
            var n = a.tempFilePaths
            wx.showLoading &&
              wx.showLoading({
                title: "正在上传图片",
                mask: !0
              })
            new Promise()
              .then(function(a) {})
              .catch(function(t) {
                wx.showModal({
                  content: t.errMsg,
                  confirmColor: "#2F92FF",
                  showCancel: !1
                })
              })
          },
          fail: function() {}
        })
      }
    }
  },
  addVideo: function(t) {
    var a = this
    this.data.paraList.length >= 150
      ? wx.showModal({
          title: "最多支持150个段落",
          confirmColor: "#2F92FF",
          showCancel: !1
        })
      : this.data.paraList.filter(function(t) {
          return t.video_url && "" !== t.video_url
        }).length >= 5
      ? wx.showModal({
          title: "最多支持5个本地视频段落",
          confirmColor: "#2F92FF",
          showCancel: !1
        })
      : wx.chooseVideo({
          sourceType: ["album", "camera"],
          maxDuration: 60,
          camera: "back",
          success: function(t) {
            if (t.duration < 3)
              wx.showModal({
                title: "视频长度至少3秒，请重新选择",
                confirmColor: "#2F92FF",
                showCancel: !1
              })
            else if (t.duration > 180)
              wx.showModal({
                title: "视频长度最多3分钟，请重新选择",
                confirmColor: "#2F92FF",
                showCancel: !1
              })
            else {
            }
          },
          fail: function(t) {}
        })
  },
  uploadVideo: function(a) {
    var i = this
    new Promise()
      .then(function(a) {})
      .catch(function(t) {
        wx.showModal({
          content: t.errMsg,
          confirmColor: "#2F92FF",
          showCancel: !1
        })
      })
  },
  editImg: function(a) {
    const n = a.currentTarget.dataset.index
    t.globalData.editArticleParaList = this.data.paraList
    wx.navigateTo({
      url: "./image?index=" + n
    })
  },
  editMusic: function() {
    console.log("编辑音乐")
    if (!this.data.SomethingTapped) {
      this.setData({
        SomethingTapped: !0
      })
      wx.navigateTo({
        url: "./music"
      })
    }
  },
  changeCover: function() {
    ;(t.globalData.editCover = this.data.cover),
      (t.globalData.editArticleParaList = this.data.paraList),
      wx.navigateTo({
        url: "./cover"
      })
  },
  removeDraft: function(t) {
    var a = this,
      i = t.currentTarget.dataset.draftKey
    wx.showModal({
      title: "是否删除草稿？",
      content: "草稿删除后将无法恢复",
      cancelText: "不删除",
      confirmText: "删除",
      confirmColor: "#2F92FF",
      success: function(t) {
        if (t.confirm) {
          wx.removeStorageSync(i)
          a.setData({
            removeDraftClicked: !0
          })
          wx.navigateBack()
        }
      }
    })
  },
  closeEditImgTips: function() {
    wx.setStorageSync("editImgTips", "true")
    this.setData({
      isShowEditImgTips: !1
    })
  },
  getPhoneNumber: function(i) {},
  closeTitleLead: function() {
    this.setData({
      showTitleLead: !1
    })
  },
  createArticle: function() {},
  showHelp: function() {},
  onLoad: function(a) {
    var e = this
    this.setData({
      phone: t.globalData.phone
    })
    t.globalData.editArticleTitle = null
    t.globalData.editCover = null
    t.globalData.editArticleParaList = null
    t.globalData.editArticleMusic = null
    if (a.temp_file_paths) {
      var n = JSON.parse(a.temp_file_paths)
      var i = n.map(function(t) {
        return {
          img: t,
          img_height: 0,
          img_width: 0,
          text: "",
          type: 1,
          adding: !1
        }
      })
      e.setData({
        paraList: i,
        cover: i[0].img,
        editImgTipsIndex: 0,
        isShowEditImgTips: !wx.getStorageSync("editImgTips")
      })
      wx.getStorageSync("editImgTips") ||
        setTimeout(function() {
          e.setData({
            isShowEditImgTips: !1
          })
        }, 1000)
      t.globalData.editArticleParaList = i
      wx.hideLoading && wx.hideLoading()
      wx.showModal({
        content: "最多可以添加100张图噢！",
        cancelText: "知道了",
        confirmText: "继续添加",
        confirmColor: "#2F92FF",
        success: function(t) {
          if (t.confirm) {
            var a = {
              currentTarget: {
                dataset: {
                  index: n.length - 1
                }
              }
            }
            e.addImg(a)
          }
        }
      })
    } else if (a.text) {
      var s = [
        {
          img: "",
          text: a.text,
          type: 1,
          adding: !1
        }
      ]
      this.setData({
        paraList: s
      })
      t.globalData.editArticleParaList = s
    } else if (a.video_file_path) {
      wx.showLoading &&
        wx.showLoading({
          title: "正在上传视频",
          mask: !0
        })
      t.globalData.editArticleParaList = []
      this.data.curIndex = -1
      this.uploadVideo(a.video_file_path)
    } else if (a.draft_key) {
    } else if (a.id) {
    }
    this.dpr = wx.getSystemInfoSync().screenWidth / 750
  },

  onReady: function() {},
  onPageScroll: function() {},
  onReachBottom: function() {
    this.expandAdd({
      currentTarget: {
        dataset: {
          index: -2
        }
      }
    })
  },
  onShow: function() {
    this.setData({
      SomethingTapped: !1
    })
    var a = t.globalData.editArticleTitle
    null !== a &&
      this.setData({
        title: a
      })
    var i = t.globalData.editArticleMusic
    null !== i
      ? this.setData({
          music: i
        })
      : this.setData({
          music: {}
        })
    var e = t.globalData.editCover
    if (
      (null !== e &&
        this.setData({
          cover: e
        }),
      (this.animation = wx.createAnimation({
        duration: 150,
        timingFunction: "ease",
        transformOrigin: "50% 100%"
      })),
      (this.isCloseAddPanel = !1),
      t.globalData.editArticleParaList)
    ) {
      var n = []
      t.globalData.editArticleParaList.forEach(function(t, a) {
        ;((t.img && "" !== t.img) ||
          (t.text && "" !== t.text) ||
          (t.video_thumbnail && "" !== t.video_thumbnail)) &&
          n.push(t)
      }),
        this.setData({
          paraList: n
        }),
        (t.globalData.editArticleParaList = n)
    }
  },
  onHide: function() {},
  onUnload: function() {
    var a = this
    if (this.data.removeDraftClicked)
      this.data.maskId && t.userInfoReadyCallback && t.userInfoReadyCallback()
    else if (
      !this.data.forceReturn &&
      0 !== this.data.paraList.length &&
      !this.data.postSuccess
    )
      if (this.data.maskId)
        if (this.data.draftKey) {
          var i = {
              mask_id: this.data.maskId,
              title: this.data.title,
              cover: this.data.cover,
              music: this.data.music,
              paraList: this.data.paraList.map(function(t) {
                return delete t.adding, t
              })
            },
            e = this.data.draftKey,
            n = wx.getStorageSync(e)
          Object.assign(i, {
            time: e.substr(6)
          }),
            JSON.stringify(n) === JSON.stringify(i) ||
              (wx.setStorageSync(e, i),
              wx.showModal({
                title: "退出编辑",
                content: "是否保存当前内容为草稿？",
                cancelText: "不保存",
                confirmText: "保存草稿",
                confirmColor: "#2F92FF",
                success: function(a) {
                  a.confirm &&
                    (t.getDraftsCallback && t.getDraftsCallback(),
                    wx.navigateTo({
                      url: "../me/me"
                    })),
                    a.cancel && wx.setStorageSync(e, n)
                }
              }))
        } else {
          var o = {
            mask_id: this.data.maskId,
            title: this.data.title,
            cover: this.data.cover,
            music: this.data.music,
            paraList: this.data.paraList.map(function(t) {
              return delete t.adding, t
            })
          }
          if (!(t.globalData.originalArticleString === JSON.stringify(o))) {
            var s = "draft_" + +new Date()
            wx.setStorageSync(
              s,
              Object.assign(o, {
                time: s.substr(6)
              })
            ),
              wx.showModal({
                title: "退出编辑",
                content: "是否保存当前内容为草稿？",
                cancelText: "不保存",
                confirmText: "保存草稿",
                confirmColor: "#2F92FF",
                success: function(a) {
                  a.confirm &&
                    (t.getDraftsCallback && t.getDraftsCallback(),
                    wx.navigateTo({
                      url: "../me/me"
                    })),
                    a.cancel && wx.removeStorageSync(s)
                }
              })
          }
        }
      else if (this.data.hasOwnProperty("draftKey")) {
        var r = this.data.draftKey,
          l = {
            title: this.data.title,
            cover: this.data.cover,
            music: this.data.music,
            paraList: this.data.paraList.map(function(t) {
              return delete t.adding, t
            }),
            time: r.substr(6)
          },
          d = wx.getStorageSync(r)
        JSON.stringify(d) === JSON.stringify(l) ||
          wx.showModal({
            title: "退出编辑",
            content: "是否保存当前内容为草稿？",
            cancelText: "不保存",
            confirmText: "保存草稿",
            confirmColor: "#2F92FF",
            success: function(a) {
              a.confirm &&
                (wx.setStorageSync(r, l),
                t.getDraftsCallback && t.getDraftsCallback(),
                wx.navigateTo({
                  url: "../me/me"
                }))
            }
          })
      } else
        wx.showModal({
          title: "退出编辑",
          content: "是否保存当前内容为草稿？",
          cancelText: "不保存",
          confirmText: "保存草稿",
          confirmColor: "#2F92FF",
          success: function(i) {
            if (i.confirm) {
              var e = "draft_" + +new Date()
              wx.setStorageSync(e, {
                title: a.data.title,
                cover: a.data.cover,
                music: a.data.music,
                paraList: a.data.paraList.map(function(t) {
                  return delete t.adding, t
                }),
                time: e.substr(6)
              }),
                t.getDraftsCallback && t.getDraftsCallback(),
                wx.navigateTo({
                  url: "../me/me"
                })
            }
          }
        })
  }
})
