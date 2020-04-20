import { connectComponent } from "wx-redux"

Component(connectComponent(
  state => ({}),
  dispatch => ({}),
)({
  properties: {
    content: {
      type: Object,
      value: []
    }
  },
  data: {},
  onLoad(options) {},
  options: {
    addGlobalClass: true
  }
}))