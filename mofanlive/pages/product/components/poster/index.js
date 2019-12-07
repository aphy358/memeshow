import _ from "lodash"

Component({
  properties: {
    posters: {
      type: Object,
      value: []
    },

    customStyle: {
      type: String,
      value: ""
    },
  },

  methods: {
    handleShowImgPreview(e) {
      const id = e.currentTarget.id
      wx.previewImage({
        current: (_.find(this.data.posters, it => it.id === id)).url,
        urls: _.map(_.filter(this.data.posters, it => it.type === 'IMG'), it => it.url)
      })
    }
  }
})