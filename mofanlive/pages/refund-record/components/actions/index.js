import { safeArea } from 'ui-kit/behaviors/safeArea'

Component({
  methods: {
    createMessage() {
      this.triggerEvent("createmessage")
    }
  },
  behaviors: [safeArea()],
  options: {
    addGlobalClass: true
  }
})