import _ from 'lodash'
import { indexOfStringify } from '@/libs/utils.js'
import { arrayLenthLimit } from '@/libs/cursorData/util.js'
import VideoCursorDataDelegator from './assets/videoCursorDataDelegator'
import CursorData from '@/libs/cursorData/index.js'


const images = [
  {id: 0, url: 'http://39.108.78.208:5105/1550725124044844.mp4',},
  {id: 10, url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',},
  {id: 20, url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',},
  {id: 30, url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',},
  {id: 40, url: 'https://gslb.miaopai.com/stream/X8~pWRN2uyMsKpAmVN1oUtVMcTP3pgfSv8hhIA__.mp4?ssig=c881979b4b5edac2bc11dcdd6dd1c9f9&time_stamp=1526461625051&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=X8%7EpWRN2uyMsKpAmVN1oUtVMcTP3pgfSv8hhIA__',},
  {id: 50, url: 'http://39.108.78.208:5105/1550725124044844.mp4',},
  {id: 60, url: 'http://39.108.78.208:5105/1550725124044844.mp4',},
  {id: 70, url: 'http://39.108.78.208:5105/1550725124044844.mp4',}
]

const findex = 3



Page({
  data: {
    items: images.slice(findex, 3+findex)
  },
  onLoad() {
    let videoCursorData = new CursorData(
      {
        queryLimit: 10,
        maxSize: 10,
      },
      new VideoCursorDataDelegator ()
    )

    

    wx.videoCursorData = videoCursorData


    this.setData({ videoCursorData })
  },
  onReady() {
  },
  beforeSwipe(e) {
    // console.log('beforeSwipe: ', e.detail)
  },
  afterSwipe(e) {
    // console.log('afterSwipe: ', e.detail)
  },
  itemsExhausted(e) {
    // console.log('itemsExhausted: ', e.detail)
  },
  activeItem(e) {
    const activeIndex = e.detail.index
    let items = this.data.items
    let index = indexOfStringify(images, e.detail.item) // 2

    if (activeIndex === 0) {
      if(index > 0){
        items = _.concat(images.slice(index-1, index), items)
        items = arrayLenthLimit(items, 3, true)

        this.setData({ items })
      }

    } else if (activeIndex === items.length - 1) {
      let activeItemIndex = images.indexOf(images.filter(n => n.id === items[activeIndex].id)[0])

      if(activeItemIndex < images.length - 1){
        items = _.concat(items, images.slice(index+1, index+2))
        items = arrayLenthLimit(items, 3)
        
        this.setData({ items })
      }
    }
  },
  swiperMove(e) {
    // console.log('move: ', e.detail)
  },

})
