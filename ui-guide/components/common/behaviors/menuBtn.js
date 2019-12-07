// 缓存
let cache = null

export function menuBtn() {
  return Behavior({
    data: {
      menuBtn: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
      }
    },

    attached() {
      if (!cache) {
        cache = wx.getMenuButtonBoundingClientRect()
      } 
      
      this.setData({ menuBtn: cache })
    }
  })
}
