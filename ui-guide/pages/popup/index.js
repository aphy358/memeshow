Page({
  data: {
    entry_basis: false,
    entry_title: false,
    entry_closable: false,
    entry_maskClosable: false,
    entry_noMask: false,
    entry_height: false,
    entry_header: false,
    entry_footer: false
  },

  onBasis() {
    this.setData({ entry_basis: true })
  },

  onTitle() {
    this.setData({ entry_title: true })
  },

  onClosable() {
    this.setData({ entry_closable: true })
  },

  onNoMask() {
    this.setData({ entry_noMask: true })
  },

  onMaskClosable() {
    this.setData({ entry_maskClosable: true })
  },

  onHeight() {
    this.setData({ entry_height: true })
  },

  onHeader() {
    this.setData({ entry_header: true })
  },

  onFooter() {
    this.setData({ entry_footer: true })
  }
})
