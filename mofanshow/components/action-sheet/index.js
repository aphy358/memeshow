/**
 * Action Sheet Component
 *
 * @event ActionSheet#cancel
 * @event ActionSheet#close
 * @evnet Action
 */

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },

    title: {
      type: String,
      value: ""
    },

    cancelText: {
      type: String,
      value: "取消"
    },


  },

  data: {

  },

  methods: {
    onClose() {
      this.triggerEvent("close")
    }
  }
})
