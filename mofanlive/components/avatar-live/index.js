const router = wx.X.router

Component({
  properties: {
    // 图片url
    url: {
      type: String,
      value: ""
    },
    // 是否正在直播
    live: {
      type: Boolean,
      value: false
    },
    // 直播间 id
    roomid: {
      type: Number | String,
      value: 23
    },
    // 用户 id
    userid: {
      type: Number | String,
      value: 43
    },

    reverse: {
      type: Boolean,
      value: false
    }
  },

  data: {
    interval: '',
    imgCls: "",
    borderCls: "",
  },

  methods: {
    setAni() {
      this.clearAni()

    },
    clearAni() {
      if (this.data.interval) {
        clearInterval(this.data.interval)
        this.data.interval = ""
      }
    },

    onTap() {
      if (this.data.live) {
        router.go("live", {id: roomid})
      }
    },
  },

  observers: {
    live(live) {
      if (live) {
        this.setAni()
      } else {
        this.clearAni()
      }
    }
  },
})