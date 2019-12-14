Component({
  properties: {
    list: Array,

    // 上边界，超过这个高度的元素被标记为 dirty
    // thresholdBottom 同理
    thresholdTop: Number,

    thresholdBottom: Number
  },

  data: {
    height: 300,
    size: 7,
    renderData: []
  },

  lifetimes: {
    attached() {
      this.initWindow()
      this._observer = this.setIntersectionObserver()
    },

    detached() {
      this._observer.disconnect()
    }
  },

  methods: {
    // 第一次渲染
    initWindow() {
      const { size, height, list } = this.data
      const sliceData = list.slice(0, size)
      sliceData.forEach((item, index) => {
        item.offset = index * this.data.height
      })
      this.setData({ renderData: sliceData })
    },

    // 监听相交的情况
    setIntersectionObserver() {
      if (this._observer) this._observer.disconnect()
      return this.createIntersectionObserver({ observeAll: true })
        .relativeTo(".recycle-list-view", {
          top: this.data.thresholdTop,
          bottom: this.data.thresholdBottom
        })
        .observe(".recycle-list-item", res => {
          if (res.intersectionRatio <= 0) {
            const { renderData, height } = this.data
            if (res.relativeRect.top > res.boundingClientRect.bottom) {
              console.log("超出上边界：", res)
              // 超出上边界
              const $dom = renderData.shift()
              $dom.offset = renderData[renderData.length - 1].offset + height
              renderData.push($dom)
            } else if (res.relativeRect.bottom < res.boundingClientRect.top) {
              // 超出下边界
              console.log("超出下边界：", res)
              const $dom = renderData.pop()
              $dom.offset = renderData[0].offset - height
              renderData.unshift($dom)
            }
            this.setData({ renderData })
          }
        })
    }

    // onScrollBottom() {
    //   this.setData(
    //     {
    //       list: this.data.list.concat([
    //         {
    //           id: randomString(2),
    //           title: randomString(2)
    //         },
    //         {
    //           id: randomString(2),
    //           title: randomString(2)
    //         }
    //       ])
    //     },
    //     () => this.setIntersectionObserver()
    //   )
    // }
  },

  observers: {
    slides() {
      // 窗口大小改变后重启 observer
      this._observer = this.setIntersectionObserver()
    }
  }
})

function randomString(len) {
  len = len || 32
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
  var maxPos = $chars.length
  var pwd = ""
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
