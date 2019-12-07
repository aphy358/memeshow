import { safeArea } from "behaviors/index"

Component({
  properties: {
    draftLoading: {
      type: Boolean,
      value: false,
    },

    submitLoading: {
      type: Boolean,
      value: false,
    }
  },

  behaviors: [safeArea()],

  methods: {
    handleTapDraft(e) {
      this.triggerEvent("draft", e)
    },
    handleTapSubmit(e) {
      this.triggerEvent("submit", e)
    }
  }
})