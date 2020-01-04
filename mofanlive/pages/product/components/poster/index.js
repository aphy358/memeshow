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
    type: 'img', // img, video
  },

  methods: {
    handleShowImgPreview(e) {
      const id = e.currentTarget.id
      wx.previewImage({
        current: (_.find(this.data.posters, it => it.id === id)).url,
        urls: _.map(_.filter(this.data.posters, it => it.type === 'IMG'), it => it.url)
      })
    },

    switchToVideo () {
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
      const counter = e.detail.current +1
      this.setData({
        counter
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})