import common from "../../utils"
import "../../assets/hart1.png"
import "../../assets/hart2.png"
import "../../assets/loading.gif"
import share from "../../../../utils/share.js"
import { connectPage } from "wx-redux"
import { menuBtn, safeArea } from "ui-kit/behaviors"
import Action from "@/redux/action"
import { XIMLiveMessage } from '@/im/message'
const {
  XIMLivePurchasingMessage,
  XIMLiveEnterRoomMessage,
} = XIMLiveMessage

const IM = wx.X.IM
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({
  userProfile: state.userProfile,
})
const mapDispatchToProps = dispatch => ({
  storeRoomInfo(roomInfo) {
    dispatch(Action.livePlayer.updateRoomInfo(roomInfo))
  },
  async initProducts() {
    const products = await Api.Product.list()
    dispatch(Action.livePlayer.initProducts(products))
  },
  setProducts(products) {
    dispatch(Action.livePlayer.updateProducts(products))
  }
})


Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [menuBtn(), safeArea()],

  data: {

    // 是否显示关注主播弹框
    showFollow: false,

    roomInfo: null,

    // 是否显示评论输入弹框
    ifShowCommentInputPopup: false,

    shopping: {
      skuSelector: {
        product: null,
        visibility: false,
        selection: {
          sku: null,
          quantity: 1
        }
      },
      orders: {
        visibility: false,
      },
    },

    timer: {
      identifier: 0,
      // 直播时间，单位 s
      clock: 0
    },

    // IM 文本消息
    textMessage: null,

  },

  onLoad: function ({ roomId }) {
    this.joinLiveRoom({ roomId })
  },

  onUnload: function () {
    this.quitLiveRoom()
  },

  /**
   * 加入直播间
   */
  async joinLiveRoom({ roomId }) {
    if (roomId) {
      // 获取直播间信息
      const roomInfo = await Api.Live.getRoomInfo(roomId)
      this.setData({ roomInfo })
      this.storeRoomInfo(roomInfo)

      // 加入直播间IM群组
      await IM.joinLiveRoom(roomInfo.im.groupId)

      // 发送 ‘加入直播间’ 消息
      const newComment = new XIMLiveEnterRoomMessage({
        channel: 'weixinApp'
      })
      IM.sendMessageToGroup(roomInfo.im.groupId, newComment)

      this.setTimer()

      await this.initProducts()

      const rsp = await Api.Live.getProducts({ roomId })
      this.setProducts(rsp.products)
    }
  },

  /**
   * 退出直播间
   */
  async quitLiveRoom() {
    const { roomInfo } = this.data

    // 退出直播间IM群组
    await IM.quitGroup(roomInfo.im.groupId)
  },

  // 点击左上角关闭按钮
  exitLiveRoom() {
    wx.showModal({
      content: "是否关闭直播",
      success: async res => {
        if (res.confirm) {
          await this.quitLiveRoom()
          router.go("userCenter")
        } else if (res.cancel) {
          // 继续直播
        }
      }
    })
  },

  // 设置直播间的计时器
  setTimer() {
    const { roomInfo, timer } = this.data
    if (timer.identifier) clearInterval(timer.identifier)
    timer.identifier = setInterval(() => {
      this.data.timer.clock++
      // 观众心跳
      if (!(timer.clock % 5)) Api.Live.heartbeat(roomInfo.id)
      this.setData({ timer })
    }, 1000)
  },

  onShareAppMessage: function (e) {
    const { userProfile, roomInfo, context } = this.data
    return share.shareLive(userProfile, context.referrerId, context.shopId, roomInfo.id)
  },

  createNewComment(e) {
    let textMessage = e.detail
    this.setData({ textMessage })
  },

  onShowCommentInputPopup(e) {
    this.setData({ ifShowCommentInputPopup: true })
  },

  hideCommentInputPopup(e) {
    this.setData({ ifShowCommentInputPopup: false })
  },

  openProductsPopup() {
    const p = this.selectComponent("#products")
    p.openProducts()
  },

  openCouponPopup() {
    const p = this.selectComponent("#products-coupon")
    p.openCoupon()
  },

  /**
   * 购买商品
   * @param {object} e
   */
  buyProduct: async function (e) {
    const id = e.detail.id
    const productRsp = await Api.Product.retrieve(id)
    this.setData({
      "shopping.skuSelector.product": productRsp,
      "shopping.skuSelector.visibility": true,
    })
  },

  // 开规格选择器
  openSkuSelector() {
    this.setData({
      "shopping.skuSelector.visibility": true
    })
  },

  // 关规格选择器
  closeSkuSelector() {
    this.setData({
      "shopping.skuSelector.visibility": false,
      "shopping.skuSelector.selection": { sku: null, quantity: 1 }
    })
  },

  /**
   * 改变已选的规格和数量
   * @param {event} e
   */
  changeSelectedSku(e) {
    this.setData({
      "shopping.skuSelector.selection": e.detail
    })
  },

  // 开结算弹窗
  async openCashier() {
    // 发送一条 IM 消息：添加了购物车
    this.purchasingMessage()

    const selection = this.data.shopping.skuSelector.selection
    await Api.Cart.addItem({
      skuId: selection.sku.id,
      productId: selection.sku.productId,
      quantity: selection.quantity,
      type: !!selection.neigou ? 1 : 0,
    })
    this.closeSkuSelector()
    wx.X.procedures.open("cashier")
  },

  async purchasingMessage() {
    const { roomInfo } = this.data
    const { shopping: { skuSelector: { product, selection } } } = this.data
    const params = {
      products: [{
        productId: selection.sku.productId,
        quantity: selection.quantity,
        imgUrl: product.image,
      }]
    }

    const message = new XIMLivePurchasingMessage(params)

    if (roomInfo && roomInfo.im) {
      // 发送消息到直播间
      await IM.sendMessageToGroup(roomInfo.im.groupId, message)
    }
  },

  openOrders() {
    this.setData({
      "shopping.orders.visibility": true
    })
  },

  closeOrders() {
    this.setData({
      "shopping.orders.visibility": false
    })
  },

  onShowFollow() {
    this.setData({ showFollow: true })
  },

  onHideFollow() {
    this.setData({ showFollow: false })
  }
}))