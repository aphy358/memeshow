Component({
  properties: {
    list: Array,

    initiator: {
      type: Object,
      value : {}
    },

    total: Number
  },

  data: {
    showAvatar: true,
  },

  observers: {
    total(value) {
      this.setData({ showAvatar: !!value })
    }
  }
})
