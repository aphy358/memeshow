Component({
  data: {
    value: ""
  },

  methods: {
    onChange(event) {
      // console.log()
    },

    onConfirm() {
      this.triggerEvent("confirm", { value: this.data.value })
    },

    onCancel() {
      this.triggerEvent("cancel")
    }
  }
})