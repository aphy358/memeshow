Component({
  properties: {
    content: {
      type: Object,
      value: {}
    },

    checked: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onChecked({ detail }) {
      this.triggerEvent('checked', {
        id: this.data.content.id,
        checked: detail.checked,
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})