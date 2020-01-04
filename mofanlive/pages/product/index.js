// import apis from "../../api/index"
const procedures = wx.X.procedures

import { productList, product } from "@/data/product"

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
   * @param {object} shop - { id, name, avatar }
   */
  data: {
    id: "",

    recommend: {
      shop: {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577450822914&di=44b4e3df9b107ca7b1c3d4297de2bf68&imgtype=0&src=http%3A%2F%2Fpics5.baidu.com%2Ffeed%2F9825bc315c6034a8d0d8b3b3a93b2751092376f3.png%3Ftoken%3D45f963d33a1ad7a88e263b0ba3b73aee%26s%3DC3A8BB47323A279A5808C9B00300F053",
        name: "美丽的韩美娟",
        desc: "天道好轮回",
        productsCount: 124,
        followers: 2847,
        rates: [
          {
            title: '用户口碑',
            rate: 4.47,
            level: '高',
          },
          {
            title: '服务态度',
            rate: 4.47,
            level: '高',
          },
          {
            title: '发货速度',
            rate: 4.47,
            level: '高',
          },
        ]
      },
      list: productList, // TODO use real Data
    },
    selector: {
      // 标记当前弹出规格选项窗是否直接购买
      isBuying: false,

      // 标记是否弹出
      open: false,
      selection: {
        sku: null,
        quantity: 0,
      }
    },
    actions: [
      {
        type: 'sold',
        content: {
          title: '全国包邮',
          sold: '已售' + 8 + '件'
        }
      },
      {
        type: 'coupon',
        content: {
          tag: "店铺券",
          coupons: ['满99减3', '满100减10'],
        }
      },
      {
        type: 'service',
        content: ['假一赔三', '7天退货', '消费者保障服务']
      },
      {
        type: 'spec',
      },
    ]
  },

  onLoad(options) {
    this.data.id = options.id
    console.log(this.data.id)
  },

  onReady() {
    this.init()
  },

  async init() {
    // const product = await apis.product.getProduct(this.data.id)
    const p = product.data
    console.log(p)
    const data = Object.assign(this.data, _.pick(p, [
      "title",
      "price",
      "originPrice",
      "soldCount",
      "medias",
      "desc",
      "skus",
      "skuImages",
      "avatar",
      "shop",
    ]))
    const index = _.findIndex(data.actions, it => it.type === 'shop')
    data.actions[index] = {
      type: 'shop',
      ...(p.shop)
    }

    this.setData(data)
  },

  handleAction(e) {
    console.log(e)
    const type = e.detail.type

    switch (type) {
      case 'spec': this.toggleSelector(true); break;
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

    // do somthing
    isBuying ? this.navToCashier() : this.addToCart()

    this.toggleSelector()
  },

  /**
   * 跳转到结算页面
   */
  navToCashier() {
    const instance = procedures.open('cashier')
    const emitter = instance.asCaller()

    const selection = this.data.selector.selection

    emitter.emit('init', {
      [this.data.shop.id]: [
        {
          skuId: selection.sku.id,
          quantity: selection.quantity,
        }
      ]
    })
  },

  /**
   * 将选择的sku添加到购物车
   */
  addToCart() {

  },

  /**
   * 选择 sku 的时候
   * @param {*} e 
   */
  handleSelectSku(e) {
    console.log(e.detail)
    this.setData({
      "selector.selection": e.detail
    })
  }
})
