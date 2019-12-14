/**
 * Collapse Component
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
    "../collapse-item/index": {
      type: "child",

      linked(target) {}
    }
  },

  data: {
    accordionNumber: false
  }
})
