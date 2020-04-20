import { connectComponent } from "wx-redux"

Component(connectComponent(
  state => ({
    neigou: state.neigou
  })
)({
  properties: {
    count: {
      type: Number,
      value: 0,
    },

    expire: {
      type: Number,
      value: 0,
    }
  }
}))