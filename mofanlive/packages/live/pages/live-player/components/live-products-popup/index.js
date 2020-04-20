import { connectComponent } from "wx-redux"
import Action from "@/redux/action"
import _ from 'lodash'
import { XIMLiveMessage } from '@/im/message'

const {
  XIMLiveIntroduceProductMessage,
  XIMLiveAddProductsMessage,
  XIMLiveRemoveProductsMessage
} = XIMLiveMessage

const Api = wx.X.Api
const router = wx.X.router
const IM = wx.X.IM

const mapStateToProps = state => ({
  livePlayer: state.livePlayer,
  products: state.livePlayer.products
})
const mapDispatchToProps = dispatch => ({
  async updateProducts(roomId) {
    const rsp = await Api.Live.getProducts({ roomId })
    dispatch(Action.livePlayer.updateProducts(rsp.products))
  }
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  properties: {
  },

  data: {
    coupon: {
      list: [],
    },
    visibility: false,
    introducingProduct: null,
    introducingSort: 0
  },

  methods: {
    onXIMLiveIntroduceProductMessage(msg) {
      const { fromName, fromAvatar, productId, roomId } = msg
      const { products } = this.data
      const idx = _.findIndex(products, it => it.id == productId)
      if (idx != -1) {
        this.setData({
          introducingProduct: products[idx],
          introducingSort: idx + 1
        })
      }
    },
    // 添加商品信息
    onXIMLiveAddProductsMessage(message) {
      const {roomId} = message
      this.updateProducts(roomId)
    },

    // 移除商品信息
    onXIMLiveRemoveProductsMessage(message) {
      const {roomId} = message
      this.updateProducts(roomId)
    },

    openProducts() {
      this.setData({
        visibility: true,
      })
    },
    openCoupon() {
      this.setData({
        current: "coupon",
        visibility: true,
      })
    },
    changeTab(e) {
      const current = e.detail.key
      this.setData({
        current
      })
    },
    fetchCoupon: async function () {
    },

    buyProduct(e) {
      console.log(e)
    },

    navToProduct() {

    },

    switchToShop() {
      router.switchTab("shop")
    },

    // 初始化消息事件
    onMessageEvents(e) {
      IM.onMessage(XIMLiveIntroduceProductMessage, this.onXIMLiveIntroduceProductMessage.bind(this))
      IM.onMessage(XIMLiveAddProductsMessage, this.onXIMLiveAddProductsMessage.bind(this))
      IM.onMessage(XIMLiveRemoveProductsMessage, this.onXIMLiveRemoveProductsMessage.bind(this))
    },

    // 取消消息事件监听
    offMessageEvents(e) {
      IM.onMessage(XIMLiveIntroduceProductMessage, this.onXIMLiveIntroduceProductMessage.bind(this))
      IM.onMessage(XIMLiveAddProductsMessage, this.onXIMLiveAddProductsMessage.bind(this))
      IM.offMessage(XIMLiveRemoveProductsMessage, this.onXIMLiveRemoveProductsMessage.bind(this))
    },
  },

  lifetimes: {
    attached() {
      this.onMessageEvents()
    },

    detached() {
      this.offMessageEvents()
    },
  },

  options: {
    addGlobalClass: true
  }
}))