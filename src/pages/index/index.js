import { connect } from "../../plugins/redux/index.js"
import { categories, mediumItems, articleItems } from "../../data"

const app = getApp()
let store = app.store

let pageConfig = {
  data: {
    list: [],
    categories: []
  },

  // 组件所需的参数
  nvabarData: {
    title: "", //导航栏 中间的标题
    showCapsule: 1 //是否显示左上角图标
  },

  /**
   * lifeTime init
   */

  onLoad(options) {
    if (options.pagename) wx.navigateTo({ url: "../article/detail" })

    this.initCategories()
    this.fetchList()
  },

  /**
   * lifeTime
   */

  onReady() {
    this.setData({
      height: app.globalData.statusBarHeight + app.globalData.titleBarHeight
    })
  },

  /**
   * 加载图片
   */

  onReachBottom() {
    this.fetchList()
  },

  /**
   * Init category
   */

  initCategories() {
    this.setData({ categories })
  },

  /**
   * get List
   */

  fetchList() {
    this.setData({ list: articleItems })
  },

  /**
   * 进入商户个人中心
   */

  toCustomer() {
    wx.navigateTo({
      url: "/pages/customer/index"
    })
  },

  /**
   * 切换导航
   */

  switchNav(e) {
    if (this.data.currentTab == e.currentTarget.dataset.current) return
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },

  changePage: function(e) {
    setTimeout(() => {
      if (e.detail.current > this.data.toView) {
        this.setData(
          {
            toView: e.detail.current - 2
          },
          () => console.log(this.data.toView)
        )
      } else if (e.detail.current <= this.data.toView) {
        this.setData(
          {
            toView: e.detail.current - 1
          },
          () => console.log(this.data.toView)
        )
      }
      if (e.detail.current == 1) {
        this.setData(
          {
            currentTab: e.detail.current,
            list: { ...this.data.list, data1: articleItems }
          },
          () => {
            // wx.hideLoading();
            console.log(this.data.list)
          }
        )
      } else {
        this.setData(
          {
            currentTab: e.detail.current,
            list: {
              ...this.data.list,
              ["data" + e.detail.current]: mediumItems
            }
          },
          () => {
            console.log(this.data.list)
          }
        )
      }
    }, 500)
  },

  /**
   * 跳转到搜索页面
   */

  search() {
    wx.navigateTo({
      url: "/pages/search/index"
    })
  },

  /**
   * 跳转到 `IM` 页面
   */

  gotoIM() {
    wx.navigateTo({ url: "/pages/aaa/index" })
  },

  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
  }
}

let mapStateToData = state => {
  return { testData: state.testData || store.getState().testData }
}

const mapDispatchToPage = dispatch => ({})

let connectedPageConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedPageConfig)
