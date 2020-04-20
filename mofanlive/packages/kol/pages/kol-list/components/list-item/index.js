import { connectComponent } from "wx-redux"

Component(connectComponent(
  state => ({}),
  dispatch => ({}),
)({
  properties: {
    kol: {
      type: Object,
      value: {}
    }
  },
  data: {},
  onLoad(options) {},
  options: {
    addGlobalClass: true
  }
}))