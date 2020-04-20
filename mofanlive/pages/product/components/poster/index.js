import _ from "lodash"

Component({
  properties: {
    posters: {
      type: Object,
      value: []
    },
    video: {
      type: String,
      value: ""
    }
  },

  data: {
    counter: 1,
    type: 1, // 1-img, 2-video
  },

  methods: {
    handleShowImgPreview(e) {
      const id = e.currentTarget.id
      const current = (_.find(this.data.posters, it => it.id == id)).url
      wx.previewImage({
        current,
        urls: _.map(_.filter(this.data.posters, it => it.type === 1), it => it.url)
      })
    },

    switchToVideo() {
      this.setData({
        type: 'video'
      })
    },
    switchToImg() {
      this.setData({
        type: 'img'
      })
    },
    swiperChange(e) {
      const counter = e.detail.current + 1
      this.setData({
        counter
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})