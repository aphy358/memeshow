Component({
  properties: {
    actions: {
      type: Object,
      value: [
        {
          type: 'spec',
          content: "颜色 尺码",
        },
        {
          type: 'shop',
          avatar: "./logo.png",
          name: "魔范小店",
        }
      ]
    }
  },

  methods: {
    handleTap(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent("click", this.data.actions[index])
    }
  },

  options: {
    addGlobalClass: true,
  }
})