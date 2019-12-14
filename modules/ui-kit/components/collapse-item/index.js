/**
 * CollapseItem Component
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
    }
  },

  data: {
    open: false
  },

  methods: {
    toggleWithAnimation() {
      const { open } = this.data

      this.isCompleted = false
      delayQuerySelector(this, ".at-accordion__body", 0).then(rect => {
        const height = parseInt(rect[0].height)
        const startHeight = open ? height : 0
        const endHeight = open ? 0 : height
        this.startOpen = false
        this.setState(
          {
            wrapperHeight: startHeight
          },
          () => {
            setTimeout(() => {
              this.setState(
                {
                  wrapperHeight: endHeight
                },
                () => {
                  setTimeout(() => {
                    this.isCompleted = true
                    this.setState({})
                  }, 700)
                }
              )
            }, 100)
          }
        )
      })
    }
  }
})
