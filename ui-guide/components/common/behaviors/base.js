export function baseBehavior() {
  return Behavior({
    methods: {
      $emit(type, detail = {}, options = {}) {
        this.triggerEvent(type, detail, options)
      },

      $nTick(fn) {
        wx.nextTick(fn)
      }
    }
  })
}
