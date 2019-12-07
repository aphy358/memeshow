Page({
  data: {
    miniLoading: true,
    largeLoading: true
  },

  onClickMiniLoadingBtn() {
    this.setData({ miniLoading: !this.data.miniLoading })
  },

  onClickLargeLoadingBtn() {
    this.setData({ largeLoading: !this.data.largeLoading })
  }
})
