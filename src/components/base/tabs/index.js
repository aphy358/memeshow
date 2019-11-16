/**
 * Tabs component
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

    sticky: {
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
        if (tab.data.index == this.data.default) tab.changeActivation(true)
      },

      unLinked(tab) {
        // todo
      },

      linkeChanged(tab) {
        // todo
      }
    }
  },

  data: {
    current: 0,
    _chirdren: []
  },

  lifetimes: {
    attached() {
      this.setData({
        current: this.data.default
      })
    },

    ready() {
      if (this.data.sticky) {}
    }
  },

  methods: {
    /**
     * 穿透到子组件的接口
     */

    changeCurrent({ index, disabled }) {
      if (disabled) return this._emitDisabled(index)
      this._changeCurrent(index)
      this._emitChange(index)
    },

    _changeCurrent(index) {
      const children = this.getRelationNodes("../tab/index")
      children.forEach(tab => {
        tab.changeActivation(tab.data.index == index)
        if (tab.data.index == index) this.setData({ current: index })
      })
    },

    _emitChange(index) {
      this.triggerEvent("change", { index })
    },

    _emitDisabled(index) {
      this.triggerEvent("disabled", { index })
    }
  },

  options: {
    multipleSlots: true,
    pureDataPattern: /^_/
  }
})
