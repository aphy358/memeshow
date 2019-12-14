import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {

  },

  methods: {
    sendVoice(e) {

    },

    openProductList() {
      store.dispatch({
        type: "LIVE_OPEN_PRODUCT_LIST"
      })
    },

  },

  lifetimes: {
    ready() {
    },
    attached() {
    },
    detached() {
    }
  },
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({
  showCommentInputPopup: () => {
    dispatch({
      type: "LIVE_SWITCH_COMMENT_INPUT_POPUP",
      payload: true
    })
  }
})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)