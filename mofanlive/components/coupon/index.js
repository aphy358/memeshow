import { safeArea } from "ui-kit/behaviors/safeArea"
import _ from 'lodash'

Component({
  properties: {
    coupon: {
      type: Object,
      value: [],
    }
  },

  methods: {
    emitClick(e) {
      this.triggerEvent("click", e.detail)
    }
  },

  options: {
    addGlobalClass: true
  },

  behaviors: [safeArea()]
})