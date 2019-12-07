Component({
  properties: {
    content: {
      type: Object,
      value: {},
      observer: "observerContent"
    },
  },

  data: {
    latitude: 0,
    longitude: 0,
    markers: [],
    name: '',

    rotate: false,
    scroll: false,
    zoom: false,
  },

  methods: {
    /**
     * 监听数据
     * @param {Object} content 
     */
    observerContent(content) {
      Promise.resolve()
        .then(() => {
          this.unlockMap()
        })
        .then(() => {
          this.setData({
            latitude: content.latitude,
            longitude: content.longitude,
            markers: [{
              latitude: content.latitude,
              longitude: content.longitude,
            }],
            name: content.name
          })
        })
        .then(() => {
          this.lockMap()
        })
    },

    /**
     * 解锁地图移动
     */
    unlockMap() {
      this.setData({
        scroll: true,
        zoom: true,
        rotate: true,
      })
    },

    /**
     * 锁住地图移动
     */
    lockMap() {
      this.setData({
        scroll: false,
        zoom: false,
        rotate: false,
      })
    },

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