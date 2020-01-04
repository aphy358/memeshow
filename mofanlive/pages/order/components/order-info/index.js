Component({
  properties: {
    info: {
      type: Object,
      value: []
    }
  },

  methods: {
    copy() {
      wx.setClipboardData({
        data: this.data.info[0].content
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})
