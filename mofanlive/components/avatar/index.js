Component({
  properties: {
    url: {
      type: String,
      value: ""
    },
    live: {
      type: Boolean,
      value: false
    },
    // 直播间 id
    liveid: {
      type: Number | String,
      value: 23
    },
    // 用户 id
    userid: {
      type: Number | String,
      value: 43
    },
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
    }
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