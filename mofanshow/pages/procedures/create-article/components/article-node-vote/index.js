Component({
  properties: {
    content: {
      type: Object,
      value: {}
    },
  },

  data: {
    pic: 'https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png'
  },

  methods: {
    /**
     * 处理节点被点击的事件
     * @param {Object} e 
     */
    emitEditEvent(e) {
      const type = e.currentTarget.dataset.type

      this.triggerEvent('edit', type, {
        bubbles: true,
        composed: true
      })
    },
  }
})