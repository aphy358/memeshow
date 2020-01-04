/**
 * Collapse Component
 */

Component({
  properties: {
    key: {
      type: String,
      optionalTypes: [Number, String]
    },

    title: String,

    open: {
      type: Boolean,
      value: false
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

  relations: {
    "../collapse-group/index": {
      type: "parent"
    }
  },

  data: {
    height: "",

    show: false,

    // 是否正在动画中
    _progressing: false
  },

  methods: {
    onToggle() {
      if (this.data.disabled) return
      let nextOpen = !this.data.open

      const query = this.createSelectorQuery().in(this)
      query
        .select(".collapse__content")
        .boundingClientRect(rect => {
          console.log(rect)

          const height = parseInt(rect.height)
          const startHeight = type ? 0 : height
          const endHeight = type ? height : 0

          this.setData(
            {
              heigh: startHeight,
              open: nextOpen
            },
            () => {
              setTimeout(() => {
                this.setData(
                  {
                    heigh: endHeight
                  },
                  () => {
                    setTimeout(() => {
                      // this.isCompleted = true
                      this.setData({})
                    }, 700)
                  }
                )
              }, 100)
            }
          )
        })
        .exec()

      // 向父节点抛出 change 事件
      if (nextOpen) {
        let parent = this.getRelationNodes("../collapse-group/index")
        if (parent.length > 0) {
          parent = parent[0]
          parent.changeCurrent(this.data.key)
        }
      }
    },

    changeState(isOpen) {
      if (isOpen !== this.data.open) this.setData({ open: isOpen })
    }
  },

  observers: {
    open(type) {
      if (this._progressing) return
      this.data.open = !this.data.open
      this.setData({ open: !this.data.open }, () => {
        wx.nextTick(() => {
          const { open } = this.data
        })
      })
    }
  },

  options: {
    pureDataPattern: /^_/
  }
})
