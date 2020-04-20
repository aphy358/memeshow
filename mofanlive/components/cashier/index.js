import { connectComponent } from "wx-redux"
import _ from 'lodash'
import PaymentType from '@/constants/payment-type'
import { XIMLiveMessage } from '@/im/message'
const { XIMLivePurchasedMessage } = XIMLiveMessage

const Api = wx.X.Api

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  roomInfo: state.livePlayer.roomInfo
})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  data: {
    // 地址
    address: null,

    // 订单内容
    trade: null,

    // 购买的全部商品数量
    totalQuantity: 0,

    // 支付单
    payment: null,

    // 支付方式
    paymentMethods: [PaymentType.WxLite],

    // 当前选中支付方式
    paymentMethod: PaymentType.WxLite,

    // 购物车列表
    cartList: null,

    // 已选中的skuId列表
    checkedSkuIds: null,

    // 店铺信息
    shop: null,
  },

  methods: {
    async init() {
      await this.initCartList()

      await this.initCashier({
        shopId: this.data.shop.id,
        skuIds: this.data.checkedSkuIds,
      })
    },

    async initCartList() {
      // 获取购物车信息
      const cart = await Api.Cart.fetchItems()

      // 购物车中的商品列表
      const cartList = cart.length > 0 ? cart[0].cartItems : []

      // 选中的sku列表 若已经有选中的列表 则加载已有的 否则全选
      var { checkedSkuIds } = this.data
      if (checkedSkuIds == null) {
        checkedSkuIds = _.map(cartList, it => it.skuId)
      }

      this.setData({
        cartList,
        shop: cart[0].shop,
        checkedSkuIds,
      })
    },

    /**
     * 初始化cashier
     * @param {int} shopId
     * @param {Array} skuIds
     */
    async initCashier(ctx) {
      const { shopId, skuIds } = ctx
      const skuIdItemMap = _.keyBy(this.data.cartList, 'skuId')

      try {
        // 默认全选商品 创建相应的结算单
        const cashier = await Api.Cashier.create({
          shopId,
          items: _.map(skuIds, id => ({
            skuId: id,
            productId: skuIdItemMap[id].productId,
            quantity: skuIdItemMap[id].quantity,
            type: skuIdItemMap[id].type,
          })),
        })

        this.setCashier(cashier)
      } catch (err) {
        console.error(err)
        this.setCashier({ trade: { items: [] } })
      }
    },

    async changeAddress(e) {
      if (!e.detail || !e.detail.id) return
      const cashier = await Api.Cashier.updateAddress(e.detail.id)
      this.setCashier(cashier)
    },

    async updateItems() {
      const skuIds = this.data.checkedSkuIds
      const skuIdItemMap = _.keyBy(this.data.cartList, 'skuId')
      const cashier = await Api.Cashier.updateItems({
        items: _.map(skuIds, id => ({
          skuId: id,
          productId: skuIdItemMap[id].productId,
          quantity: skuIdItemMap[id].quantity,
          type: skuIdItemMap[id].type,
        }))
      })
      this.setCashier(cashier)
      this.setData({ checkedSkuIds: skuIds })
    },

    async onRemarkBlur({ detail: { value } }) {
      const { shop } = this.data
      const cashier = await Api.Cashier.updateRemark({
        shopId: shop.id,
        remark: value
      })
      this.setCashier(cashier)
    },

    /**
     * 更新cashier到view
     * @param {Object} address
     * @param {Object} trade
     * @param {String} paymentMethod
     * @param {Object} payment
     */
    setCashier(cashier) {
      const address = !!cashier.address ? cashier.address : null

      // 累加得出总商品个数
      const totalQuantity = _.reduce(this.data.cartList,
        (res, item) => {
          if (_.includes(this.data.checkedSkuIds, item.skuId)) {
            return res + item.quantity
          }
          return res
        }, 0)

      const paymentMethod = cashier.paymentMethod

      const payment = cashier.payment

      const trade = {
        remark: cashier.trade.remark,
        shop: cashier.trade.shop,
        items: _.map(this.data.cartList, item => {
          if (typeof item.specs != "string") {
            if (item.specs && item.specs.length === 1) {
              item.specs = item.specs[0].v
            } else {
              item.specs = _.reduce(item.specs, (res, spec, index) => {
                if (index === 0) {
                  return res + spec.k + ':' + spec.v
                }
                return res + ' ' + spec.k + ':' + spec.v
              }, "")
            }
          }
          return {
            ...item,
            selected: _.includes(this.data.checkedSkuIds, item.skuId),
            type: (_.find(this.data.cartList, it => it.skuId == item.skuId)).type,
          }
        })
      }

      this.setData({
        totalQuantity,
        paymentMethod,
        payment,
        trade,
        address,
      })
    },

    /**
     * 提交订单
     * 
     * @param {event} e
     */
    async handleConfirm(e) {
      this.purchasedMessage()

      if (!this.canCheckout()) return;

      const rsp = await wx.X.Api.Cashier.checkout()
      if (rsp.id) {
        const { credential } = await wx.X.Api.Order.pay({ orderId: rsp.id })

        // const { nonceStr, package, paySign, signType, timeStamp } = credential
        console.log('timeStamp：', credential.timeStamp + '');
        console.log('nonceStr：', credential.nonceStr + '');
        console.log('package：', credential.package);
        console.log('signType：', credential.signType);
        console.log('paySign：', credential.paySign);

        wx.showLoading()

        wx.requestPayment({
          timeStamp: credential.timeStamp + '',
          nonceStr: credential.nonceStr + '',
          package: credential.package,
          signType: credential.signType,
          paySign: credential.paySign,
          complete: (msg) => {
            console.log(msg)
            this.data.checkedSkuIds = []
            this.triggerEvent('order', {
              id: rsp.id
            })
          }
        })
      }
    },

    canCheckout() {
      const { address, trade } = this.data
      if (!address) {
        wx.showToast({
          icon: 'none',
          title: "请填写地址"
        })
        return false
      }

      if (!trade.items || trade.items.length < 1) {
        wx.showToast({
          icon: 'none',
          title: "没有商品哦，快来购买商品吧"
        })
        return false
      }

      return true
    },

    /**
     * 发送下单的 IM 信息
     */
    async purchasedMessage() {
      const IM = wx.X.IM
      const { roomInfo } = this.data
      const { trade } = this.data

      // 如果是在订单中心 '再来一单'，则没有直播间信息，也就不需要发送 IM 消息
      if (roomInfo && roomInfo.im) {
        const products = trade.items.filter(n => n.selected).map(n => {
          return {
            productId: n.productId,
            quantity: n.quantity,
            imgUrl: n.image
          }
        })

        const message = new XIMLivePurchasedMessage({ products })

        // 发送消息到直播间
        await IM.sendMessageToGroup(roomInfo.im.groupId, message)
      }
    },

    /**
     * 全选
     */
    handleCheckAll() {
      const cartList = this.data.cartList
      if (this.data.checkedSkuIds.length === cartList.length) {
        this.data.checkedSkuIds = []
      } else {
        this.data.checkedSkuIds = _.map(cartList, it => it.skuId)
      }
      this.updateItems()
    },

    /**
     * 改变商品
     * @param {Object} e 
     */
    async handleItemChange(e) {
      const { skuId, checked, deleted, quantity } = e.detail

      if (deleted) {
        await this.deleteItem(skuId)
      } else {
        await this.updateItem(skuId, checked, quantity)
      }

      await this.updateItems()
    },

    /**
     * 从购物车删除该商品
     * @param {integer} skuId 
     */
    async deleteItem(skuId) {
      this.setData({ "trade.items": [] })
      const rsp = await wx.X.Api.Cart.deleteItem([skuId])
      var { checkedSkuIds } = this.data
      const idx = _.findIndex(checkedSkuIds, it => it === skuId)
      if (idx != -1) {
        checkedSkuIds.splice(idx, 1)
      }
      this.data.checkedSkuIds = checkedSkuIds
      await this.initCartList()
      await this.updateItems()
      if (rsp) {
        wx.showToast({ title: "已删除" })
      }
    },

    async updateItem(skuId, checked, quantity) {
      const checkedSkuIds = this.data.checkedSkuIds
      const idx = _.findIndex(checkedSkuIds, it => it === skuId)
      if (checked) {
        if (idx === -1) {
          checkedSkuIds.push(skuId)
        }
      } else {
        if (idx != -1) {
          checkedSkuIds.splice(idx, 1)
        }
      }

      const cartItem = _.find(this.data.cartList, it => it.skuId == skuId)
      if (cartItem.quantity != quantity) {
        await Api.Cart.updateItemQuantity({
          skuId, quantity,
          productId: cartItem.productId,
        })
      }

      await this.initCartList()
    },

    navigateToShop() {
      this.triggerEvent("shop")
    },

  },

  options: {
    addGlobalClass: true,
  }
}))
