import _ from 'lodash'

Component({
  data: {
    images: []
  },

  methods: {
    add() {
      const images = this.data.images
      const count = 5 - images.length
      if (count === 0) {
        wx.showToast({
          title: '最多选择5张'
        })
        return;
      }
      wx.chooseImage({
        count: count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          const images = _.concat(this.data.images, res.tempFilePaths)
          this.setData({
            images
          })
          this.emitChange()
        }
      })
    },

    delete(e) {
      const index = e.currentTarget.dataset.index
      console.log(index)
      this.data.images.splice(index, 1)
      this.setData({
        images: this.data.images
      })
      this.emitChange()
    },

    emitChange() {
      this.triggerEvent('change', this.data.images)
    }
  },

  options: {
    addGlobalClass: true
  }
})