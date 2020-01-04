import { connectPage } from "wx-redux"
import { menuBtn, safeArea } from "ui-kit/behaviors/index"
import { productList, product, trades } from "@/data/product"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [menuBtn(), safeArea()],

  data: {
    playURL: 'rtmp://qcloud-live.mofanbaby.tv/live/test',

    // 新增评论
    newComment: null,

    // 是否显示评论输入弹框
    ifShowCommentInputPopup: false,

    shopping: {
      listPopup: {
        visibility: false,
        tabs: [
          {
            title: '商品',
            key: 'product',
          },
          {
            title: '优惠券',
            key: 'coupon'
          }
        ],
        currentTab: 'coupon',
        products: {
          list: [],
        },
        coupon: {
          list: []
        },
      },
      skuSelector: {
        product: null,
        visibility: false,
        selection: {
          sku: null,
          quantity: 1
        }
      },
      cashier: {
        visibility: false,
        content: null,
      },
      orders: {
        visibility: false,
      },
      address: {
        selector: {
          visibility: false,
        },
        editor: {
          preset: {},
          visibility: false,
        }
      }
    },
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.playContext = wx.createLivePlayerContext('player', this);

    this.playContext.play({
      success: function () {
      },
      fail: function () {
      },
      complete: function () {
      }
    });
  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function (e) {
    return {
      title: '谁谁谁 正在直播>>好看得停不下来！',
      path: '/pages/live/index',
    }

  },

  stopLivePlayer(e) {
    this.playContext.stop()
  },

  createNewComment(e) {
    this.setData({ newComment: e.detail })
  },

  onShowCommentInputPopup(e) {
    this.setData({ ifShowCommentInputPopup: true })
  },

  hideCommentInputPopup(e) {
    this.setData({ ifShowCommentInputPopup: false })
  },

  // 开列表弹窗
  openListPopup(e) {
    let tab = this.data.shopping.listPopup.currentTab
    if (e.detail && e.detail.key) {
      tab = e.detail.key
    }
    this.changeListTab({
      detail: {
        key: tab
      }
    })
    this.setData({
      "shopping.listPopup.visibility": true
    })
  },

  closeListPopup() {
    this.setData({
      "shopping.listPopup.visibility": false
    })
  },

  // 改变列表弹出框标签
  changeListTab(e) {
    const currentTab = e.detail.key
    console.log(currentTab)
    if (currentTab === 'product') {
      this.fetchProductList()
    } else {
      this.fetchCoupon()
    }
    this.setData({
      "shopping.listPopup.currentTab": e.detail.key
    })
  },

  /**
   * 跳转到商品详情页
   * @param {event} e
   */
  navToProduct(e) {
    const id = e.detail.id
    wx.navigateTo({
      url: `/pages/product/index?id=${id}`,
      fail(err) {
        console.error(err)
      }
    })
  },

  /**
   * 拉取商品列表
   */
  fetchProductList() {
    console.log('fetch products')
    // TODO use real data
    this.setData({
      "shopping.listPopup.products.list": productList
    })
  },

  /**
   * 在商品列表点击购买的时候
   * @param {event} e
   */
  buyProduct(e) {
    const id = e.detail.id
    this.fetchProduct(e.detail.id)
    this.openSkuSelector()
  },

  /**
   * 从后端拉取商品的数据
   * @param {String} id
   */
  fetchProduct(id) {
    // TODO use real data
    console.log('fetch product', product.data)
    this.setData({
      "shopping.skuSelector.product": product.data
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
  openCashier() {
    const cashierState = this.data.shopping.cashier.visibility
    if (!cashierState) {
      this.settleCashier()
    }

    this.setData({
      "shopping.cashier.visibility": true
    })
  },

  closeCashier() {
    this.setData({
      "shopping.cashier.visibility": false
    })
  },

  /**
   * 填写结算弹窗的内容
   */
  settleCashier() {
    this.setData({
      "shopping.cashier.trades": trades,
    })
  },

  /**
   * 结算时不使用优惠券
   */
  noUseCoupon() {
    // TODO @eas
    this.closeCoupon()
  },

  /**
   * 从后端拉取优惠券列表
   * @param {String} id - shopid
   */
  fetchCoupon(id) {
    // TODO use real data
    this.setData({
      "shopping.listPopup.coupon.list": trades[0].coupon
    })
  },

  /**
   * 选择优惠券
   * @param {event} e
   */
  changeCoupon(e) {
    const coupon = e.detail
    console.log(coupon)
    this.closeCoupon()
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

  openAddressSelector() {
    console.log('open')
    this.setData({
      "shopping.address.selector.visibility": true
    })
  },

  closeAddressSelector() {
    this.setData({
      "shopping.address.selector.visibility": false
    })
  },

  addressChange(e) {
    console.log(e)
    this.closeAddressSelector()
    const cashier = this.selectComponent('#cashier')
    cashier.changeAddress()
  },

  openAddressEditor() {
    this.setData({
      "shopping.address.editor.visibility": true
    })
  },

  closeAddressEditor() {
    this.setData({
      "shopping.address.editor.visibility": false
    })
  },
}))