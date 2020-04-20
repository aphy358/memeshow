Component({
  properties: {
    products: {
      type: Object,
      value: []
    }
  },

  methods: {
    onMoreTap() {
      this.triggerEvent("more")
    }
  },

  options: {
    addGlobalClass: true
  }
})