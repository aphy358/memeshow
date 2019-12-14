/**
 * NavigationBar Component
 *
 * @slot  banner
 * @slot [center]
 *
 * @event NavigationBar#back
 */

import { safeArea, menuBtn } from "ui-kit/behaviors/index"

Component({
  properties: {
    banner: {
      type: Boolean,
      value: false
    },

    back: {
      type: Boolean,
      value: false
    },

    home: {
      type: Boolean,
      value: false
    },

    placehold: {
      type: Boolean,
      value: true
    },

    loading: {
      type: Boolean,
      value: false
    },

    background: {
      type: String,
      value: "#ffffff"
    },

    bgOpacity: {
      type: Number,
      value: 1
    },
    
    menuBackground: {
      type: String,
      value: "#ffffff"
    },

    color: {
      type: String,
      value: "#000000"
    },

    // 1px 1px 2px black
    textShadow: {
      type: String,
      value: ""
    },
  },

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

  behaviors: [safeArea(), menuBtn()],

  lifetimes: {
    attached() {
    }
  },

  methods: {
    onBack() {
      this._emitBack()
    },

    _emitBack() {
      this.triggerEvent("back")
    },

    // 跳转到首页
    goHome(e) {
      wx.reLaunch({
        url: "/pages/index/index"
      })
    },

    // 返回上一页
    goPrePage(e) {
      wx.navigateBack({
        fail() {
          wx.reLaunch({
            url: "/pages/index/index"
          })
        }
      })
    },
  },

  options: {
    multipleSlots: true
  },
})