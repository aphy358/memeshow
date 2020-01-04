Page({
  singleCheckboxChange({ detail }) {
    wx.showModal({
      content: `value 为 ${detail.value} 的 checkbox 状态变为 ${detail.checked}`
    })
  }
})