Page({
  data: {
    actived: '2'
  },

  onChangCurrent() {
    this.setData({
      actived: '3'
    })
  },

  onChange({ detail }) {
    wx.showModal({
      content: `你点击了第 ${detail.key} 个 tab`
    })
  },

  onError({ detail }) {
    wx.showModal({
      content: `你点击了第 ${detail.key} 个 tab，该 tab 为 disabled`
    })
  }
})
