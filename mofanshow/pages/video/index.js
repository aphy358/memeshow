import _ from 'lodash'
import { arrayLenthLimit } from 'libs/cursorData/util.js'

import { connect } from "libs/redux/index.js"
const app = getApp()
const store = app.store


const videos = [
  { id: 0, url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/97a4989351552c5057d0e65057bccf88-1544597076301.mp4', stared: false },
  { id: 10, url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', stared: false },
  { id: 20, url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', stared: false },
  { id: 30, url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', stared: false },
  { id: 40, url: 'https://gslb.miaopai.com/stream/X8~pWRN2uyMsKpAmVN1oUtVMcTP3pgfSv8hhIA__.mp4?ssig=c881979b4b5edac2bc11dcdd6dd1c9f9&time_stamp=1526461625051&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=X8%7EpWRN2uyMsKpAmVN1oUtVMcTP3pgfSv8hhIA__', stared: false },
  { id: 50, url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/97a4989351552c5057d0e65057bccf88-1544597076301.mp4', stared: true },
  { id: 60, url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/97a4989351552c5057d0e65057bccf88-1544597076301.mp4', stared: false },
  { id: 70, url: 'http://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/97a4989351552c5057d0e65057bccf88-1544597076301.mp4', stared: false }
]

const findex = 3


let pageConfig = {
  data: {
    items: []
  },
  watch: {
    items(newVal, oldVal){
      if (newVal && newVal.length) {
        // 更新数据源
        newVal.forEach(n => {
          let index = videos.findIndex(m => m.id === n.id)
          videos.splice(index, 1, n)
        });
      }
    }
  },
  onLoad() {
    let items = videos.slice(findex, 3 + findex)
    this._updateVideoItems(items)
  },
  onReady() {
  },
  beforeSwipe(e) {
  },
  afterSwipe(e) {
  },
  itemsExhausted(e) {
  },
  activeItem(e) {
    const activeIndex = e.detail.index
    let items = this.data.items
    let index = videos.findIndex(n => n.id === e.detail.item.id)
    
    if (activeIndex === 0) {
      if (index > 0) {
        items = _.concat(videos.slice(index - 1, index), items)
        items = arrayLenthLimit(items, 3, true)

        this._updateVideoItems(items)
      }

    } else if (activeIndex === items.length - 1) {
      let activeItemIndex = videos.indexOf(videos.filter(n => n.id === items[activeIndex].id)[0])

      if (activeItemIndex < videos.length - 1) {
        items = _.concat(items, videos.slice(index + 1, index + 2))
        items = arrayLenthLimit(items, 3)

        this._updateVideoItems(items)
      }
    }
  },

  // 更新 store 里保存的 videoItems
  _updateVideoItems(items) {
    store.dispatch({
      type: 'SET_VIDEO_ITEMS',
      payload: items
    })
  },

  swiperMove(e) {
  },
}

const mapStateToData = state => ({ items: state.MAIN.VIDEO.videoItems })
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)
