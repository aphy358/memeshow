import Utils from "../../utils"
import { connectPage } from "wx-redux"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {},
  onLoad(options) { },
  options: {
    addGlobalClass: true
  }
}))