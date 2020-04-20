import { safeArea } from "ui-kit/behaviors"

Component({
  behaviors: [safeArea()],

  properties: {
    number: {
      type: Number,
      value: 0
    }
  },

  methods: {
    onTap() {
      this.triggerEvent("confirm")
    }
  },

  options: {
    addGlobalClass: true
  }
})