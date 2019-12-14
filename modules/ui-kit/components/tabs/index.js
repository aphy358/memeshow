/**
 * Tabs Component
 *
 * @slot before
 * @slot [default]
 * @slot after
 *
 * @event Tabs#disabled
 * @event Tabs#change
 */

Component({
  properties: {
    // 初始的 `tab` 项
    default: {
      type: Number,
      value: 0,
      optionalTypes: [Number, String]
    },

    scroll: {
      type: Boolean,
      value: false
    },

    stickable: {
      type: Boolean,
      value: false
    },

    /**
     * 当 `sticky` 为 `true` 时生效
     * 相对窗口的偏移量
     * 单位 `px`
     */

    offset: {
      type: Number,
      value: 0
    }
  },

  relations: {
    "../tab/index": {
      type: "child",

      linked(tab) {
        if (tab.data.key === this.data.current) tab.$changeActivation(true)
      },

      unLinked(tab) {
        this._changeCurrent(this.data.current)
      },

      linkeChanged(tab) {
        this._changeCurrent(this.data.current)
      }
    }
  },

  data: {
    current: 0,
    sticky: false
  },

  observers: {
    default(key) {
      this._changeCurrent(key)
    }
  },

  lifetimes: {
    attached() {
      this.setData({
        current: this.data.default
      })
      if (this.data.stickable) {
        this.setIntersectionObserver()
      }
    }
  },

  methods: {
    /**
     * 穿透到子组件的接口
     */

    $changeCurrent({ key, disabled }) {
      if (disabled) return this._emitDisabled(key)
      this._changeCurrent(key)
      this._emitChange(key)
    },

    _changeCurrent(key) {
      const children = this.getRelationNodes("../tab/index")
      children.forEach(tab => {
        tab.$changeActivation(tab.data.key == key)
        if (tab.data.key == key) this.setData({ current: key })
      })
    },

    _emitChange(key) {
      this.triggerEvent("change", { key })
    },

    _emitDisabled(key) {
      this.triggerEvent("disabled", { key })
    },

    setIntersectionObserver() {
      if (this._observer) this._observer.disconnect()
      this._observer = this.createIntersectionObserver()
        .relativeToViewport({
          top: this.data.offset
        })
        .observe(".tabs__observer__placeholder", res => {
          if (res.intersectionRatio < 1) this.setData({ sticky: true })
          else if (res.intersectionRatio >=1) this.setData({ sticky: false })
        })
    }
  },

  options: {
    multipleSlots: true,
    pureDataPattern: /^_/
  }
})
