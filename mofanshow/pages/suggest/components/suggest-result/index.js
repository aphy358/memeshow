import { connect } from "libs/redux/index.js"
import { articleData, mediumItems } from '@/data/articleData'
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
    showFilterPop: false,

    suggestResList: [
      {
        text: '全部',
        type: 0,
        active: false,
        dataList: []
      },
      {
        text: '商品',
        type: 1,
        active: false,
        dataList: []
      },
      {
        text: '用户',
        type: 2,
        active: true,
        dataList: []
      },
    ],

    subjectList: [
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
      {
        text: '珍藏红色唇膏',
        url: '/pages/subject-square/index'
      },
    ],

    allList: [],

    userList: [
      {
        avatar: '',
        nickName: '某某个唇膏控',
        fans: 488,
        articleNum: 423,
      },
      {
        avatar: '',
        nickName: '某某个唇膏控',
        fans: 388,
        articleNum: 233,
      },
      {
        avatar: '',
        nickName: '唇膏控好口怕',
        fans: 8,
        articleNum: 293,
      },
      {
        avatar: '',
        nickName: '唇膏控是什么',
        fans: 881,
        articleNum: 123,
      },
      {
        avatar: '',
        nickName: '某某个唇膏控？',
        fans: 188,
        articleNum: 213,
      },
      {
        avatar: '',
        nickName: '不存在唇膏控',
        fans: 808,
        articleNum: 203,
      },
    ]
  },

  methods: {
    switchSuggestRes(e) {
      const type = e.currentTarget.dataset.type
      let { suggestResList } = this.data
      suggestResList.forEach(item => item.active = item.type == type)

      this.setData({ suggestResList })
    },

    fetchData() {
      this.setData({ allList: mediumItems })
    },

    hideFilterPopup() {
      this.setData({ showFilterPop: false })
    },

    showFilterPopup() {
      this.setData({ showFilterPop: true })
    },

  },

  attached() {
    this.fetchData()
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)