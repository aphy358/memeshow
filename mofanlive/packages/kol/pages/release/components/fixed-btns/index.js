import { safeArea } from "ui-kit/behaviors"

Component({
  behaviors: [safeArea()],

  methods: {
    onTap() {
      this.triggerEvent("confirm")
    }
  },

  options: {
    addGlobalClass: true
  }
})