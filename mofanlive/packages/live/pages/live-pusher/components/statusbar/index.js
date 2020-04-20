import { menuBtn, safeArea } from "ui-kit/behaviors"

Component({
  properties: {
    timer: {
      type: Number,
      value: 0
    }
  },

  data: {
    marginRight: 0,
    marginVertical: 0
  },

  methods: {
    onCloseLive() {
      this.triggerEvent(
        "close",
        {
          // todo 传递直播数据
        },
        {}
      )
    },
  },

  behaviors: [menuBtn(), safeArea()],

  lifetimes: {
    attached() {
      wx.nextTick(() =>
        this.setData({
          marginRight: this.data.safeArea.right - this.data.menuBtn.right,
          marginVertical: this.data.menuBtn.top - this.data.statusBarHeight
        })
      )
    }
  }

})