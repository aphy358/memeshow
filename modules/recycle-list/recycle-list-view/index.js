Component({
  properties: {
    list: Array,

    // 上边界，超过这个高度的元素被标记为 outer
    // thresholdBottom 同理
    thresholdTop: Number,

    thresholdBottom: Number
  },

  data: {
    height: 300,

    size: 10,

    // 当前渲染的数据
    renderList: [],

    // renderList head 在 list 的位置
    _positon: 0,

    // 偏移量
    _offset_min: 0,
    _offset_max: 0
  },

  lifetimes: {
    attached() {
      this.initRenderList()
      this.setIntersectionObserver()
    },

    detached() {
      this.removeIntersectionObserver()
    }
  },

  methods: {
    /**
     * 判断是否超过了阈值
     *
     * @returns {boolean}
     */

    isOverThreshold() {
      // todo 这部分应该是 cursor data 要做的
      return Boolean(false)
    },

    /**
     * 从 List 加载下一个数据
     *
     * @returns {any}
     */

    loadNext() {
      const { list, _position, size } = this.data
      const index = _position + size

      if (this.isOverThreshold(index)) {
        // todo load next List
      } else { this.data._position = _position + 1 }
      return list[index]
    },

    /**
     * 从 List 加载上一个数据
     *
     * @returns
     */

    loadPrev() {
      const { list, _position } = this.data
      const index = _position

      if (this.isOverThreshold(index)) {
        // todo
      } else { this.data._position = _position - 1 }
      return list[index]
    },

    /**
     * 将下一个数据加入 render list
     */

    renderNext(index) {
      let { renderList, height, _offset_max } = this.data
      const $dom = renderList[index]

      $dom.content = this.loadNext()
      $dom.offset = _offset_max
      $dom.status = "outer-bottom"

      this.data._offset_max += height
      this.data._offset_min += height
    },

    /**
r    * 将上一个数据加入 render list
     */

    renderPrev(index) {
      let { renderList, height, _offset_min } = this.data
      let $dom = renderList[index]

      $dom.content = this.loadPrev()
      $dom.offset = _offset_min
      $dom.status = "outer-top"

      this.data._offset_min -= height
      this.data._offset_max -= height
    },

    setIntersectionObserver() {
      this.removeIntersectionObserver()
      this._observer = this.createIntersectionObserver({
        initialRatio: 0,
        observeAll: true,
        thresholds: [0, 1]
      }).relativeTo(".recycle-list-view", {
        top: this.data.thresholdTop,
        bottom: this.data.thresholdBottom
      })
      this._observer.observe(".recycle-list-item", res => {
        const { renderList } = this.data
        const index = res.dataset.index
        if (res.intersectionRatio <= 0) {
          if (res.relativeRect.top >= res.boundingClientRect.bottom) {
            renderList[index].status = "outer-top"
          } else if (res.relativeRect.bottom <= res.boundingClientRect.top) {
            renderList[index].status = "outer-bottom"
            renderList.forEach(($dom, i) => {
              if ($dom.status === "outer-bottom") this.renderPrev(i)
            })
            this.setData({ renderList })
          }
        } else {
          renderList[index].status = "inner"
        }
      })
    },

    removeIntersectionObserver() {
      if (this._observer) this._observer.disconnect()
    },

    onScrollBottom(e) {
      const { renderList } = this.data

      renderList.forEach(($dom, i) => {
        if ($dom.status === "outer-top") this.renderNext(i)
      })

      this.setData({ renderList })
    },

    onScrollTop(e) {
      // todo: load prev list item
    },

    // 第一次渲染，初始化 renderList
    initRenderList() {
      const { size, height, list } = this.data
      const sliceList = list.slice(0, size)
      const renderList = []

      sliceList.forEach((item, index) => {
        renderList[index] = {
          status: "",
          content: item,
          offset: index * height
        }
      })

      this.data._position = 0
      this.data._offset_min = 0
      this.data._offset_max = height * size
      this.setData({ renderList })
    }
  },

  options: {
    pureDataPattern: /^_/
  }
})
