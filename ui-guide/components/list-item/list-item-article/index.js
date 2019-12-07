/**
 * List Item Article Component
 */

Component({
  properties: {
    post: Object
  },

  methods: {
    onReadmore() {
      if (!this.data.post.id) return
      wx.navigateTo({
        url: `pages/article/index?id=${this.data.post.id}`
      })
    }
  }
})
