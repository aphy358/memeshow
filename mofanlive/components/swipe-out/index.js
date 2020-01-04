Component({
  properties: {
    menu: {
      type: Object,
      value: []
    },
  },

  data: {
    startX: 0,
    offset: 0,
    open: false,
  },

  methods: {
    clickMenu(e) {
      const index = e.currentTarget.dataset.index

    },
    touch(e) {
      this.setData({
        startX: this.data.open ? e.touches[0].pageX - this.data.offset : e.touches[0].pageX
      })
    },
    move(e) {
      const currentX = e.touches[0].pageX
      let offset = this.data.offset
      const startX = this.data.startX
      const res = currentX - startX
      if (res > 0) {
        offset = 0
      } else if (res < -100) {
        offset = -100
      } else {
        offset = res
      }
      this.setData({ offset })
    },
    release(e) {
      const currentX = e.changedTouches[0].pageX
      let offset = this.data.offset
      const startX = this.data.startX
      const res = currentX - startX
      if (res < -50) {
        offset = -100
        this.data.open = true
      } else {
        offset = 0
        this.data.open = false
      }
      this.setData({ offset })
    },
    getContentRect() {
    }
  },

  options: {
    addGlobalClass: true
  }
})