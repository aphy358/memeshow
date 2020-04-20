import { connectPage } from "wx-redux"
import Action from "@/redux/action"
import computedBehavior from "miniprogram-computed"
import share from "../../utils/share.js"
import "./assets/shop-top-bg.png"
import "./assets/group.png"

var systemInfo = (0, require("./utils/systemInfo").getSystemInfoSync)() || {},
  ios = (systemInfo.system || "").indexOf("iOS") > -1,
  statusHeight = systemInfo.statusBarHeight || 24,
  contentHeight = ios ? 44 : 48,
  titleHeight = statusHeight + contentHeight

const Api = wx.X.Api
const router = wx.X.router

Page(
  connectPage(
    state => ({
      context: state.context,
      shopInfo: state.context.shop,
      shareRelations: state.context.shareRelations,
      neigou: state.neigou,
      userProfile: state.userProfile,
      sellerProfile: state.sellerProfile
    }),
    dispatch => ({
      updateVouchers(voucher) {
        dispatch(Action.neigou.update(voucher))
      },
      updateUserProfile(userProfile) {
        dispatch(Action.userProfile.update(userProfile))
      }
    })
  )({
    data: {
      // 商品列表
      products: [],

      // 当前商品列表页码
      pageNo: 1,

      // 列表正在加载
      isLoading: false,

      // 已加载完
      noMore: false,

      // 当前商品列表的分类，默认0
      productType: 0,

      // 是否提示员工信息
      showEmployeeInfo: false,

      // 内购券不足，提示
      showProductCard: false,

      // 是否展示直播窗口
      showLivePlayer: false,

      // tab 是否处于 sticky
      tabSticky: false,

      // tab 处于 sticky 时的 scroll 高度
      tabScroll: 0,

      navBarOpacity: 0,
      systemInfo: systemInfo,
      titleHeight: titleHeight,
      statusBarHeight: statusHeight,

      current: "shop"
    },

    behaviors: [computedBehavior],

    watch: {
      userProfile(newVal, oldVal) {
        if (newVal && newVal.id) {
          this.fetchVouchers()
            .then(res => this.setData({ neigou: res }))
            .catch(err => console.error(err))
        }
      }
    },

    onLoad(params) {
      // todo 判断是否观看直播
      // setTimeout(() => {
      //   this.setData({ showLivePlayer: true })
      // }, 1000);
    },

    onShow() {
      this.getTabBar().setData({ current: "shop" })

      this.fetchProducts({})
        .then(res => this.setData({ products: res }))
        .catch(err => console.error(err))

      this.fetchVouchers()
        .then(res => this.updateVouchers(res))
        .catch(err => console.error(err))
    },

    // 获取商品列表
    async fetchProducts(params) {
      this.setData({
        isLoading: true,
        noMore: false
      })
      const result = await Api.Product.list(params)
      if (result && !result.length) {
        setTimeout(
          () =>
            this.setData({
              isLoading: false,
              noMore: false
            }),
          200
        )
      } else {
        setTimeout(() =>
          this.setData({
            isLoading: false,
            noMore: true
          })
        )
      }
      return result
    },

    // 获取内购详情
    async fetchVouchers() {
      return await Api.InternalBuy.balance()
    },

    // 点击列表中的商品
    onClickProduct({ detail }) {
      const { product } = detail

      //todo
      // 内购券不足，弹出卡片
      // const { neigou } = this.data
      // if (product.neigou && product.neigou.couponCount > neigou.count) {
      //   this.setData({
      //     showProductCard: true,
      //     clickProduct: product
      //   })
      //   return
      // }

      router.navigate("product", { id: product.id })
    },

    // 关闭内购不足提示卡片
    onCloseProductCard() {
      this.setData({
        showProductCard: false,
        clickProduct: {}
      })
    },

    // 联系企业员工
    onContact() {
      this.setData({
        showEmployeeInfo: true
      })
    },

    // 咨询员工成功回调
    onCompleteMessage() {
      this.setData({ showEmployeeInfo: false })
      /**
       * todo
       * 点击“在线咨询”后，弹出
          1、当内购员工用企业微信添加时：工作人员已加您微信，可在“服务通知”中通过好友请求
          2、当内购员工用个人微信添加时：工作人员已加您微信，可在“通讯录”中通过好友请求
       */
      const content = "工作人员已加您微信，可在“服务通知”中通过好友请求"
      wx.showModal({
        content,
        showCancel: false
      })
    },

    // 关闭咨询员工
    onCloseContact() {
      this.setData({ showEmployeeInfo: false })
    },

    // 关闭直播
    onLiveClose() {
      this.setData({ showLivePlayer: false })
    },

    // 开播
    onLivePlay() {
      // TODO 这里可能需要先创建直播，然后再跳转
      router.go("livePusher")
    },

    // 切换分类
    async onChangeTab({ detail }) {
      this.setData({ products: [] })
      try {
        if (this.data.tabSticky)
          await wx.pageScrollTo({
            scrollTop: this.data.tabScroll,
            duration: 50
          })
      } finally {
        const key = detail.key
        const params =
          key == 0
            ? {
                pageNo: 1
              }
            : {
                pageNo: 1,
                categoryId: key
              }

        this.fetchProducts(params).then(res =>
          this.setData({
            pageNo: 1,
            products: res,
            productType: key
          })
        )
      }
    },

    onChangeSticky({ detail }) {
      // 设置scroll top
      if (!this.data.tabScroll) {
        const query = wx.createSelectorQuery()
        query.selectViewport().scrollOffset()
        query.exec(res => {
          this.setData({ tabScroll: res[0].scrollTop || 0 })
        })
      }

      this.setData({ tabSticky: detail.sticky || false })
    },

    // 分享
    onShareAppMessage: function(e) {
      const id = e.target.dataset && e.target.dataset.id
      const { products, context } = this.data
      const targetProduct = products.find(product => product.id == id)

      return !!id
        ? share.shareProduct(targetProduct, context.referrerId, context.shopId)
        : share.shareShop(context.referrerId, context.shopId)
    },

    // 翻页
    onReachBottom() {
      const { pageNo, products, productType } = this.data
      if (this.data.noMore) return
      // 判断当前分类
      const params =
        productType == 0
          ? {
              pageNo: pageNo + 1
            }
          : {
              pageNo: pageNo + 1,
              categoryid: productType
            }

      this.fetchProducts(params)
        .then(res => {
          if (res.length) {
            this.setData({
              products: products.concat(res),
              pageNo: pageNo + 1
            })
          }
        })
        .catch(err => console.error(err))
    },

    // 滚动，头部动画
    onPageScroll({ scrollTop }) {
      let offset = (Number(scrollTop) / 18).toFixed(2)
      offset = offset > 1 ? 1 : offset
      this.data.navBarOpacity !== offset &&
        this.setData({ navBarOpacity: offset })
    }
  })
)
