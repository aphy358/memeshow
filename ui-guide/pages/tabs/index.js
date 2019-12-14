Page({
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