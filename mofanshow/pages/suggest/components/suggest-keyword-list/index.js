import { connect } from "libs/redux/index.js"
import _ from 'lodash'
const app = getApp()
const store = app.store

const res = [
  {
    text: '唇膏',
    url: '',
    checkMore: {
      checkType: 1,
      text: '42w+篇作品'
    }
  },
  {
    text: '唇膏',
    url: '',
    checkMore: {
      checkType: 2,
      text: '2w+件商品'
    }
  },
  {
    text: '还唇是唇膏膏',
    url: '',
  },
  {
    text: '唇膏有完没完',
    url: '',
  },
  {
    text: '李嘉琪的唇膏掉了',
    url: '',
  },
]

let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {

  },

  data: {
    resList: [],

    keyword: '唇膏'
  },

  methods: {
    // 处理返回来的搜索结果，突出关键字
    processRes() {
      let _res = _.cloneDeep(res)
      const { keyword } = this.data

      _res.forEach(item => {
        item.textNodes = []
        let cache1 = ''   // 暂存连续的非关键字
        let cache2 = ''   // 暂存连续的关键字
        const addTextNodes = (text, iskey) => {
          item.textNodes.push({
            text,
            iskey
          })
        }

        for (let i = 0; i < item.text.length; i++) {
          const word = item.text[i]

          if (keyword.indexOf(word) === -1) {
            cache1 += word

            if (cache2 !== '') {
              addTextNodes(cache2, true)
              cache2 = ''
            }

          } else {
            cache2 += word

            if (cache1 !== '') {
              addTextNodes(cache1)
              cache1 = ''
            }
          }
        }

        if (cache1 !== '') {
          addTextNodes(cache1)
          cache1 = ''
        }

        if (cache2 !== '') {
          addTextNodes(cache2, true)
          cache2 = ''
        }
      })
  
      this.setData({ resList: _res })
    }
  },

  attached() {
    this.processRes()
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)