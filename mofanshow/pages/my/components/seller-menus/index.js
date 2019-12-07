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
    menuList: [
      {
        img: '/assets/images/background/video.png',
        text: '拼团',
        url: ''
      },
      {
        img: '/assets/images/shop1.png',
        text: '优惠券',
        url: ''
      },
      {
        img: '/assets/images/text-icon.png',
        text: '红包',
        url: ''
      },
      {
        img: '/assets/images/background/text.png',
        text: '推广',
        url: ''
      },
      {
        img: '/assets/images/cart.png',
        text: '商品管理',
        url: ''
      },
      {
        img: '/assets/images/background/text.png',
        text: '订单管理',
        url: ''
      },
      {
        img: '/assets/images/shop1.png',
        text: '客户管理',
        url: ''
      },
      {
        img: '/assets/images/text-icon.png',
        text: '全部',
        url: ''
      },
    ]
  },

  methods: {

  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)