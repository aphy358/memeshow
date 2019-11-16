Component({
  properties: {
    type: {
      type: String,
      value: 'base'
    },
    content: {
      type: Object,
      value: {}
    }
  },

  relations: {
    '../article-node-base': {
      type: 'child'
    },
    '../article-node-video': {
      type: 'child'
    }
  },
})