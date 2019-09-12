var t = getApp();

Page({
  data: {
    tabActive: ["active", ""],
    search: {
      keywords: "",
      page: 2,
      clear: "",
      result: []
    },
    hotMusic: [],
    originalMusicInfo: {},
    musicInfo: {},
    searchReturn: !1,
    rcmd_list: 0,
    tabTop: t.globalData.statusBarHeight + t.globalData.titleBarHeight
  },
  tapChoose: function () {
    this.setData({
      tabActive: ["active", ""]
    });
  },
  tapSearch: function () {
    this.setData({
      tabActive: ["", "active"]
    });
  },
  tapCategory: function (t) {
    var e = t.currentTarget.dataset.index, a = this.data.musicList;
    if (0 === e) {
      var s = this.data.search.result;
      s.forEach(function (t, e) {
        t.selected = "";
      }) 
      this.setData({
        "search.result": s
      }) 
      a.forEach(function (t, e) {
        t.active = "" 
        t.selected = ""
        t.list.forEach(function (t) {
          t.selected = "";
        });
      })
      a[0].selected = "selected"
      wx.stopBackgroundAudio() 
      this.setData({
        musicInfo: null
      });
    } else {
      if ("active" === a[e].active) {
        a.forEach(function (t, e) {
          t.active = ""
            - 1 !== t.list.findIndex(function (t) {
              return "selected" === t.selected;
            }) && (t.selected = "selected");
        })
      }else {
        a.forEach(function (t, e) {
          t.active = ""
            - 1 !== t.list.findIndex(function (t) {
              return "selected" === t.selected;
            }) && (t.selected = "selected");
        }) 
        a[e].active = "active" 
        a[e].selected = ""
      }
      this.setData({
        musicList: a
      });
    }
  },
  selectSong: function (t) {
    var e = this.data.search.result;
    e.forEach(function (t, e) {
      t.selected = "";
    }) 
    this.setData({
      "search.result": e
    });
    var a = t.currentTarget.dataset, s = a.catIndex, c = a.songIndex, i = this.data.musicList, o = {};
    i.forEach(function (t) {
      t.selected = "" 
      t.list.forEach(function (t) {
      t.selected = "";
      });
    }) 
    i[s].list[c].selected = "selected" 
    o.dataUrl = i[s].list[c].url 
    this.setData({
      musicInfo: {
        name: i[s].list[c].name,
        url: i[s].list[c].url,
        cat_index: s,
        song_index: c
      }
    }) 
    this.setData({
      musicList: i
    })
    wx.playBackgroundAudio({
      dataUrl: o.dataUrl,
      success: function () {
        console.log("音乐地址：", o.dataUrl), console.log("播放音乐成功");
      },
      fail: function () {
        console.log("播放音乐失败");
      }
    });
  },
  selectSearchResult: function (t) {
    var e = this, a = this.data.musicList;
    a.forEach(function (t) {
      t.selected = "" 
      t.list.forEach(function (t) {
      t.selected = "";
      });
    })
    this.setData({
      musicList: a
    });
    var s = t.currentTarget.dataset.index, c = this.data.search.result, i = {};
    c.forEach(function (t, a) {
      if(s===a) {
        t.selected = "selected"
        i.dataUrl = t.url
        e.setData({
          musicInfo: t
        })
      }else {
        t.selected = ""
      }
    }) 
    this.setData({
      "search.result": c
    }) 
    wx.playBackgroundAudio({
      dataUrl: i.dataUrl,
      success: function () {
        console.log("音乐地址：", i.dataUrl), console.log("播放音乐成功");
      },
      fail: function () {
        console.log("播放音乐失败");
      }
    });
  },
  onSearchInput: function (t) {
    this.setData({
      "search.keywords": t.detail.value
    }) 
    "" !== t.detail.value ? this.setData({
      "search.clear": "show"
    }) : this.setData({
      "search.clear": "",
      searchReturn: !1,
      "search.result": [],
      "search.page": 2,
      rcmd_list: 0
    });
  },
  clearSearch: function () {
    this.setData({
      "search.keywords": "",
      "search.clear": "",
      "search.result": [],
      searchReturn: !1,
      rcmd_list: 0
    });
  },
  search: function () {
    
  },
  loadMoreMusic: function () {
    
  },
  finishChooseMusic: function () {
    t.globalData.editArticleMusic = this.data.musicInfo, wx.stopBackgroundAudio(), wx.navigateBack();
  },
  onLoad: function (a) {
    var c = t.globalData.editArticleMusic;
    this.setData({
      originalMusicInfo: c
    }) 
    const list = [
      {
        category: '校园歌曲',
        list: [
          { name: '腐草为萤', url: 'http://www.ytmp3.cn/down/55457.mp3' },
          { name: 'Monody', url: 'http://www.ytmp3.cn/down/55456.mp3' },
          { name: '牵丝戏', url: 'http://www.ytmp3.cn/down/55454.mp3' },
          { name: '旧雨', url: 'http://www.ytmp3.cn/down/55453.mp3' },
          { name: '风雨彩虹铿锵玫瑰', url: 'http://www.ytmp3.cn/down/55432.mp3' },
          { name: '听心', url: 'http://www.ytmp3.cn/down/55431.mp3' },
          { name: '葬花吟', url: 'http://www.ytmp3.cn/down/55430.mp3' },
        ]
      },
      {
        category: '经典老歌',
        list: [
          { name: '腐草为萤', url: 'http://www.ytmp3.cn/down/55457.mp3' },
          { name: 'Monody', url: 'http://www.ytmp3.cn/down/55456.mp3' },
          { name: '牵丝戏', url: 'http://www.ytmp3.cn/down/55454.mp3' },
          { name: '旧雨', url: 'http://www.ytmp3.cn/down/55453.mp3' },
          { name: '风雨彩虹铿锵玫瑰', url: 'http://www.ytmp3.cn/down/55432.mp3' },
          { name: '听心', url: 'http://www.ytmp3.cn/down/55431.mp3' },
          { name: '葬花吟', url: 'http://www.ytmp3.cn/down/55430.mp3' },
        ]
      },
      {
        category: '流行音乐',
        list: [
          { name: '腐草为萤', url: 'http://www.ytmp3.cn/down/55457.mp3' },
          { name: 'Monody', url: 'http://www.ytmp3.cn/down/55456.mp3' },
          { name: '牵丝戏', url: 'http://www.ytmp3.cn/down/55454.mp3' },
          { name: '旧雨', url: 'http://www.ytmp3.cn/down/55453.mp3' },
          { name: '风雨彩虹铿锵玫瑰', url: 'http://www.ytmp3.cn/down/55432.mp3' },
          { name: '听心', url: 'http://www.ytmp3.cn/down/55431.mp3' },
          { name: '葬花吟', url: 'http://www.ytmp3.cn/down/55430.mp3' },
        ]
      },
      {
        category: '抖音热曲',
        list: [
          { name: '腐草为萤', url: 'http://www.ytmp3.cn/down/55457.mp3' },
          { name: 'Monody', url: 'http://www.ytmp3.cn/down/55456.mp3' },
          { name: '牵丝戏', url: 'http://www.ytmp3.cn/down/55454.mp3' },
          { name: '旧雨', url: 'http://www.ytmp3.cn/down/55453.mp3' },
          { name: '风雨彩虹铿锵玫瑰', url: 'http://www.ytmp3.cn/down/55432.mp3' },
          { name: '听心', url: 'http://www.ytmp3.cn/down/55431.mp3' },
          { name: '葬花吟', url: 'http://www.ytmp3.cn/down/55430.mp3' },
        ]
      }
    ]
    const data = list.map((t)=> {
      var e = t.list.map((o)=> {
        return {
          name: o.name,
          url: o.url,
          selected: ""
        }
      })
      return {
        catName: t.category,
        active: "",
        selected: "",
        list: e
      };
      
    })
    const listData = [{
      catName: "无背景音乐",
      list: [],
      active: "active",
      selected: ""
    }].concat(data);
    console.log('listData:', listData)
    this.setData({
      musicList: listData
    })
    this.getHotMusic()
  },
  getHotMusic: function () {
    const data = ['好姐妹', '春暖花开(live)', '相亲相爱一家人', '终身难忘战友情', '六一国际儿童节', '正月十五闹春花', '歌在飞']
    this.setData({
      hotMusic: data
    })
  },
  searchHot: function (t) {
    var e = t.currentTarget.dataset.hot;
    this.setData({
      "search.keywords": e
    }) 
    this.search();
  },
  onReady: function () {
    
  },
  onUnload: function () {
   
  },
  onReachBottom: function () {
  }
});