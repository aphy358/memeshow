import apis from "../../api/index"

Page({

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
   */
  data: {
    id: "",

    selector: {
      // 标记当前弹出规格选项窗是否直接购买
      isBuying: false,

      // 标记是否弹出
      open: false,
      selection: {
        skuId: "",
        count: 0,
      }
    },
  },

  onLoad(options) {
    this.data.id = options.id
  },

  onReady() {
    this.init()
  },

  async init() {
    const product = await apis.product.getProduct(this.data.id)
    console.log(product)
    this.setData(_.pick(product, [
      "title",
      "price",
      "originPrice",
      "soldCount",
      "medias",
      "desc",
      "shop",
      "skus",
      "skuImages",
      "avatar",
    ]))
  },

  handleAction(e) {
    console.log(e)
    const type = e.detail.type

    switch (type) {
      case 'spec': this.toggleSelector(); break;
      case 'shop': this.navToShop(); break;
    }
  },

  /**
   * 跳转到商店页面
   */
  navToShop() {

  },

  /**
   * 点击购买按钮
   */
  handleBuy() {
    this.toggleSelector(true)
  },

  /**
   * 选择器
   */
  toggleSelector(isBuying = false) {
    this.setData({
      "selector.open": !this.data.selector.open
    })
    this.data.selector.isBuying = typeof isBuying === 'boolean' && isBuying
  },

  /**
   * 点击规格选择窗口的确认按钮
   */
  handleSelectorConfirm() {
    const isBuying = this.data.selector.isBuying
    console.log(isBuying)

    // do somthing

    this.toggleSelector()
  },

  /**
   * 选择 sku 的时候
   * @param {*} e 
   */
  handleSelectSku(e) {
    console.log(e)
  }
})
