// custom-tab-bar/index.js
import config from "../config/config.js"
import { safeArea } from "ui-kit/behaviors/index"

const { tabBar } = config

Component({
  behaviors: [safeArea()],

  properties: {
    selected: { type: Number, value: 0 }
  },

  data: {
    ifShowCreatePop: false,
    ...tabBar
  },

  attached() {},

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      
      if (data.index !== 2) {
        const url = data.path
        wx.switchTab({ url })
        this.setData({
          selected: data.index
        })
      } else {
        this.setData({ ifShowCreatePop: true })
      }
    },

    hidePopup(e) {
      this.setData({ ifShowCreatePop: false })
    }
  }
})
