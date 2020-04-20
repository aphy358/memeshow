import { connectPage } from "wx-redux"

const procedures = wx.X.procedures
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(
  connectPage(
    mapStateToProps,
    mapDispatchToProps
  )({
    data: {
      sid: ""
    },

    cashier: null,

    onLoad(options) {
      this.data.sid = options.sid
    },

    onUnload() {
      const instance = procedures.get(this.data.sid)
      if (instance) {
        instance.asProcedure().emit("complete")
      }
    },

    onReady() {
      const instance = procedures.get(this.data.sid)
      instance.register(this)

      /**
       * 选定要结算的sku
       * @param {array[int]} skuIds
       */
      instance.asProcedure().on("init", ctx => {
        if (!!ctx.skuIds || ctx.skuIds.length > 0)
          this.cashier.setCheckedIds(ctx.skuIds)
      })
    },

    onShow() {
      if (this.cashier == null) {
        this.cashier = this.selectComponent("#cashier")
      }
      this.cashier.init()
    },

    navigateToShop() {
      const instance = procedures.get(this.data.sid)
      if (instance) {
        instance.asProcedure().emit("complete")
      }
      router.go("shop")
    },

    /**
     * 重定向到订单详情
     * @param {*} e
     */
    redirectToOrder(e) {
      const { id } = e.detail
      if (id) {
        router.go("orderDetail", { id: id }, { method: "redirectTo" })
      }
    }
  })
)
