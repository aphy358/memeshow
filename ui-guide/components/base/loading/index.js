/**
 * Loading component
 */

Component({
  properties: {
    /**
     * loading 的类型
     * `circular`, `spinner`
     */

    type: {
      type: String,
      value: "circular"
    },

    /**
     * 尺寸，单位为 `rpx`
     */

    size: {
      type: Number,
      value: 60
    },

    color: {
      type: String,
      value: "#000"
    }
  },

  data: {
    sizeWithUnit: "60rpx"
  },

  observers: {
    size: function(size) {
      this.setSizeWithUnit(size)
    }
  },

  methods: {
    setSizeWithUnit(size) {
      this.setData({
        sizeWithUnit: size + "rpx"
      })
    }
  }
})
