const procedures = wx.X.procedures

Page({
  data: {
    initImages: [],
    images: [],
    text: ""
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onUnLoad() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)
    this.data.instance = instance

    // 初始化数据
    instance.asProcedure().on("init", (data) => {
      this.setData({
        text: data.texts.length ? data.texts.join("") : "",
        initImages: data.images || []
      })
    })
  },

  onChangeDesc({ detail }) {
    this.setData({
      text: detail.value
    })
  },

  onChangeImages({ detail }) {
    this.setData({
      images: detail
    })
  },

  onSave() {
    const result = this.buildMetaData()
    this.data.instance.asProcedure().emit("change", result)
    wx.navigateBack({
      delta: 1
    })
  },

  buildMetaData() {
    const { text, images } = this.data
    let imagestr = ""
    let textstr = ""

    if (images.length) {
      imagestr = images.reduce(
        (string, img) => (string += `<img src=${img}></img>`),
        imagestr
      )
    }

    if (text.length) {
      textstr = `<p>${text}</p>`
    }

    return {
      desc: `${textstr}${imagestr}`,
      meta: {
        texts: [text],
        images: images
      }
    }
  }
})
