import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {
    videoActive: {
      type: Boolean,
      value: false
    },

    doubleTapPos: {
      type: Object,
      value: {},
      observer: "doubleTaped"
    },

    // 数据项
    item: {
      type: Object,
      value: {},
      observer: "toggleStar"
    },
  },

  data: {
    staredClazz: 'star-no',

    // 是否正在直播
    onLive: true,
  },

  methods: {
    // 切换点赞效果
    toggleStar(item) {
      if (this.data.videoActive) {
        let staredClazz = item.stared ? 'star-yes' : 'star-no'
        this.setData({ staredClazz })
      }
    },

    showCommentPopup() {
      this.triggerEvent('showCommentPopup')
    },

    starYes(e) {
      this._updateVideoItemStar(true)
    },

    starNo(e) {
      this._updateVideoItemStar(false)
    },

    _updateVideoItemStar(ifStared) {
      let { item } = this.data
      item.stared = ifStared

      store.dispatch({
        type: 'UPDATE_VIDEO_ITEM',
        payload: item
      })
    },

    doubleTaped(e) {
      if (typeof e.detail !== 'undefined'){
        this._updateVideoItemStar(true)
        this.setData({ staredClazz: 'star-yes' })
      }
    }
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)