import { connect } from "libs/redux/index.js"

const app = getApp()

let pageConfig ={
  data: {
    orderEntry: [
      {
        title: '待支付',
        icon: '',
        type: "unpaid",
      },
      {
        title: '待发货',
        icon: '',
        type: "undeliver",
      },
      {
        title: '待收货',
        icon: '',
        type: "delivering",
      },
      {
        title: '售后',
        icon: '',
        type: "refund",
      },
    ],

    actions: [
      {
        title: '购物车',
        type: 'cart',
      },
      {
        title: '收货地址',
        type: 'address',
      },
      {
        title: '联系客服',
        type: 'service',
      },
    ]
  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)