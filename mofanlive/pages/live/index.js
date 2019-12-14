import { connect } from "libs/redux/index.js"
import { menuBtn, safeArea } from "ui-kit/behaviors/index"
import { productList } from "@/data/product"


let pageConfig = {
  behaviors: [menuBtn(), safeArea()],

  data: {
    playURL: 'rtmp://pili-live-rtmp.mofanbaby.tv/mofanbaby/test-1',

    // 新增评论
    newComment: null
  },

  onLoad: function (options) {
    this.fetchProductList()
  },

  onReady: function () {
    this.playContext = wx.createLivePlayerContext('player', this);

    this.playContext.play({
      success: function() {
        console.log('play success');
      },
      fail: function() {
        console.log('play fail');
      },
      complete: function() {
        console.log('complete');
      }
    });

    // this.playContext.requestFullScreen({ direction: 0 });
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

  onShareAppMessage: function () {

  },

  stopLivePlayer(e) {
    this.playContext.stop()
  },

  createNewComment(e) {
    this.setData({ newComment: e.detail })
  },

  /**
   * 跳转到商品详情页
   * @param {event} e 
   */
  navToProduct(e) {
    const id = e.detail.id
    wx.navigateTo({
      url: `/pages/product/index?id=${id}`,
      fail(err){
        console.error(err)
      }
    })
  },
}

const mapStateToData = state => ({
  productListVisibility: state.LIVE.productListVisibility,
  productList: state.LIVE.productList,
  showCommentInputPopup: state.LIVE.showCommentInputPopup,
})
const mapDispatchToPage = dispatch => ({
  hideCommentInputPopup(e) {
    dispatch({
      type: "LIVE_SWITCH_COMMENT_INPUT_POPUP",
      payload: false
    })
  },

  fetchProductList(e) {
    dispatch({
      type: "LIVE_REDUCE_PRODUCT_LIST",
      payload: {
        products: productList
      }
    })
  },

  // 当商品列表关闭的时候
  handleProductListClose() {
    dispatch({
      type: "LIVE_CLOSE_PRODUCT_LIST"
    })
  },
})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)