/**
 * User Card Light Component
 *
 * @event UserCardLight#click
 */

Component({
  properties: {
    avatar: String,

    name: String,

    // 头像是否可预览
    preview: {
      type: Boolean,
      value: false
    },

    // 单位 `rpx`
    size: {
      type: Number,
      value: 120
    },

    // 排列方向。`row`, `column`
    mode: {
      type: String,
      value: "column"
    }
  },

  externalClasses: ["mf-class", "font-class", "avatar-class"],

  methods: {
    onClick() {
      this.triggerEvent("click")
    }
  }
})
