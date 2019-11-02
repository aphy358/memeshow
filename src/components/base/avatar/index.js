/**
 * Avatar Component
 *
 * @event Avatar#click
 */

Component({
  properties: {
    url: String,

    size: {
      type: Number,
      value: 50
    },

    /**
     * 头像类型
     * `circle`, `square`
     */

    mode: {
      type: String,
      value: "circle"
    },

    /**
     * 是否支持预览
     */

    preview: {
      type: Boolean,
      value: false
    }
  },

  externalClasses: ["mf-class"],

  methods: {
    onLoadDefault({ detail }) {},

    onLoaded({ detail }) {},

    onTapImage() {
      const image = this.data.url
      if (this.data.preview) wx.previewImage({ urls: [image] })
      this.triggerEvent("click", { url: image })
    }
  }
})
