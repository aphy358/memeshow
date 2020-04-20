import { connectPage } from "wx-redux"
import share from "../../utils/share.js"

const procedures = wx.X.procedures
const Api = wx.X.Api

Page(
  connectPage(
    state => ({
      context: state.context,
      neigou: state.neigou,
      userProfile: state.userProfile,
      sellerProfile: state.sellerProfile
    }),
    dispatch => ({})
  )({
    /**
     * 以下字段将通过请求异步获取
     * @param {string} title
     * @param {integer} price - 分为单位
     * @param {integer} originPrice - 分为单位
     * @param {array} medias - 头图
     * @param {integer} soldCount
     * @param {string} desc - 商品详情 富文本
     * @param {array} skus - 商品规格列表
     * @param {array} skusImages - 商品不同规格对应的图片
     * @param {object} shop - { id, name, avatar }
     */
    data: {
      id: "",
      voucherDialog: false,
      product: null,

      neigouPrice: 0,
      selector: {
        // 标记当前弹出规格选项窗是否内购
        isNeigou: true,

        // 标记是否弹出
        open: false,
        selection: {
          sku: null,
          quantity: 0
        }
      },

      sreenHeight: 0,
      goTopVisibility: false,
    },

    onLoad(options) {
      this.data.id = options.id
    },

    onReady() {
      this.init()

      wx.getSystemInfo({
        success: (res) => {
          const { screenHeight } = res
          if (screenHeight) {
            this.setData({ screenHeight })
          }
        }
      })
    },

    onPageScroll(e) {
      const { scrollTop } = e
      const { screenHeight, goTopVisibility } = this.data
      if (scrollTop > screenHeight ^ goTopVisibility) {
        this.setData({
          goTopVisibility: scrollTop > screenHeight
        })
      }
    },

    async init() {
      const product = await wx.X.Api.Product.retrieve(this.data.id)
      this.setData({ product })
      console.log(product)
      const data = Object.assign(
        this.data,
        _.pick(product, [
          "title",
          "price",
          "originPrice",
          "soldCount",
          "medias",
          "desc",
          "skus",
          "skuImages",
          "image",
          "shop"
        ])
      )
      _.forEach(product.skus, it => {
        if (
          !!it.neigou &&
          (data.neigouPrice == 0 || data.neigouPrice > it.neigou.price)
        ) {
          data.neigouPrice = it.neigou.price
        }
      })
      // const index = _.findIndex(data.actions, it => it.type === "shop")
      // data.actions[index] = {
      //   type: "shop",
      //   ...product.shop
      // }

      this.setData(data)
    },

    handleAction(e) {
      const type = e.detail.type

      switch (type) {
        case "spec":
          this.toggleSelector(true)
          break
        case "shop":
          this.navToShop()
          break
      }
    },

    /**
     * 跳转到商店页面
     */
    navToShop() { },

    /**
     * 点击购买按钮
     */
    handleBuy(e) {
      const type = e.detail.type // 0-normal; 1-neigou
      this.toggleSelector(type)
    },

    /**
     * 选择器
     *
     * @param {boolean} type - 是否内购商品
     */
    toggleSelector(type = 1) {
      this.data.selector.isNeigou = type == 1

      this.setData({
        "selector.open": !this.data.selector.open,
        "selector.isNeigou": type == 1
      })
    },

    // 关闭规格选择弹窗
    onCloseSelector() {
      this.setData({ "selector.open": false })
    },

    /**
     * 点击规格选择窗口的确认按钮
     */
    async handleSelectorConfirm() {
      const { selector, neigou, product, userProfile } = this.data
      const selection = this.data.selector.selection

      if (selection.sku) {
        // 内购的情况，判断内购券是否足够
        if (
          selector.isNeigou &&
          selection.sku.neigou &&
          selection.sku.neigou.couponCount > neigou.count
        )
          return this.setData({
            voucherDialog: true,
            voucherDialogcount: selection.sku.neigou.couponCount,
            "selector.open": false
          })

        await this.addToCart(selection)
      }
    },

    // 内购券不足
    handleCloseDialog() {
      this.setData({ voucherDialog: false })
    },

    /**
     * 将选择的sku添加到购物车
     */
    async addToCart(selection) {
      wx.showLoading()
      const isNeigou = this.data.selector.isNeigou
      const rsp = await wx.X.Api.Cart.addItem({
        skuId: selection.sku.id,
        quantity: selection.quantity,
        productId: selection.sku.productId,
        type: isNeigou && selection.sku.neigou ? 1 : 0 // 内购
      })
      wx.hideLoading()
      this.setData({
        "selector.open": false
      })
      procedures.open("cashier")
    },

    /**
     * 选择 sku 的时候
     * @param {*} e
     */
    handleSelectSku(e) {
      this.setData({
        "selector.selection": e.detail
      })
    },

    collect() {
      this.setData({
        collected: !this.data.collected
      })
    },

    onShareAppMessage(e) {
      const {
        context,
        userProfile,
        currentShop,
        sellerProfile,
        product,
        selector
      } = this.data
      const isMerchant = context.isMerchant
      const shop = sellerProfile.shop

      let shareSku = {}
      if (selector.selection.sku) {
        shareSku = selector.selection.sku
      } else {
        shareSku = product.skus.reduce((minSku, sku) => {
          if (sku.neigou) {
            return sku.neigou.price < minSku.neigou.price ? sku : minSku
          } else {
            return sku.price < minSku.price ? sku : minSku
          }
        })
      }

      // todo 使用 sku image ，但是目前没有这个逻辑
      const shareProduct = {
        ...shareSku,
        id: product.id,
        image: product.image
      }
      return share.shareProduct(shareProduct, this.data.context.referrerId, this.data.context.shopId)
    },

    goTop() {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  })
)
