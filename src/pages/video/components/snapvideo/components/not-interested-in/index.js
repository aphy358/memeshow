
Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },
  
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: 'togglePopupClass'
    },
  },

  data: {
    customAnimation: {},

    fadeClass: ''
  },

  methods: {
    // 切换 Popup 的类名，以应用不同的动画
    togglePopupClass(ifShow) {
      if (ifShow) {
        this.setData({ fadeClass: 'fade-in' })
      } else {
        this.setData({ fadeClass: 'fade-out' })
      }
    },

    hideNTIPopup(e) {
      this.triggerEvent('hideNTIPopup')
    },
  }
})
