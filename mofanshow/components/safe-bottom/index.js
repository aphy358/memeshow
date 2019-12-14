import { safeArea } from "ui-kit/behaviors/index"

Component({
  properties: {
    background: {
      type: String,
      value: "white"
    },

    disabled: {
      type: String,
      value: false
    }
  },

  behaviors: [safeArea()],
})