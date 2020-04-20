import { connectComponent } from "wx-redux"

const procedures = wx.X.procedures
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(
  connectComponent(
    mapStateToProps,
    mapDispatchToProps
  )({
    options: {
      // 允许页面的样式影响到组件
      styleIsolation: "apply-shared"
    },

    properties: {},

    data: {},

    methods: {
      manageShop() {
        const editor = wx.X.procedures.open("edit-shop")
      },

      onAddProduct() {
        const procedure = procedures.open("merchant-product-editor")
        procedure.asCaller().on("success", id => {
          router.redirect("merchantProduct", { type: "delisting" })
        })
      }
    },

    lifetimes: {
      ready() {},
      attached() {},
      detached() {}
    }
  })
)
