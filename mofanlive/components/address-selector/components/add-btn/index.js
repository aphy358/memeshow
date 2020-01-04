import { safeArea } from 'ui-kit/behaviors/safeArea'

Component({
  methods: {
    emitAdd() {
      this.triggerEvent("add")
    },
    emitWechat() {
      this.triggerEvent("wechat")
    }
  },

  options: {
    addGlobalClass: true
  },
  behaviors: [safeArea()]
})