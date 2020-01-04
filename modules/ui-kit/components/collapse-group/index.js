/**
 * CollapseGroup Component
 */

Component({
  properties: {
    // 手风琴模式
    accordion: {
      type: Boolean,
      value: false
    }
  },

  relations: {
    "../collapse/index": {
      type: "child",

      linked(target) {}
    }
  },

  data: {
    accordionNumber: false
  },

  methods: {
    changeCurrent(key) {
      if (!this.data.accordion) return
      const children = this.walkChild()
      children.forEach(node => {
        node.changeState(key == node.data.key)
      })
    },

    walkChild() {
      return this.getRelationNodes("../collapse/index")
    }
  }
})
