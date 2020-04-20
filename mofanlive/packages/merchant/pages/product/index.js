import { connectPage } from "wx-redux"
import Action from "@/redux/action"
import share from "../../../../utils/share.js"
// todo
import common from "../../utils/index"

const procedures = wx.X.procedures
const Api = wx.X.Api

Page(
  connectPage(
    state => ({
      userProfile: state.userProfile,
      sellerProfile: state.sellerProfile
    }),
    dispatch => ({})
  )({
    data: {
      // 列表的数据
      listData: {
        type: "listing",
        list: [],
        pageNo: 1,
        noMore: false
      },

      actionField: {
        id: "", // 正在操作的 productid
        show: false
      }
    },

    onLoad(params) {
      let type = params.type || "listing"
      let list = []

      if (type !== "listing") {
        this.fetchProducts({ listing: false, pageNo: 1 })
        this.setData({ "listData.type": "delisting" })
      } else {
        this.fetchProducts({ listing: true, pageNo: 1 })
      }
    },

    // 获取商品列表
    async fetchProducts(params) {
      let list = await Api.MerchantProduct.list(params)
      this.setData({
        "listData.list": list,
        "listData.pageNo": params.pageNo + 1
      })
    },

    // tab change
    onChangeType({ detail }) {
      this.fetchProducts({ listing: detail.key === "listing", pageNo: 1 })
      this.setData({ "listData.type": detail.key })
    },

    // 商品上架的回调
    onShelves() {
      this.fetchProducts({ listing: false, pageNo: 1 })
    },

    // 商品下架
    offShelves() {
      Api.MerchantProduct.offShelves(this.data.actionField.id).then(res => {
        wx.showToast({ title: "下架成功" })
        this.fetchProducts({ listing: true, pageNo: 1 })
      })
    },

    // 打开 actionsheet
    onActionOpen({ detail }) {
      this.setData({ actionField: { show: true, id: detail.id } })
    },

    // 关闭 actionsheet
    onActionClose() {
      this.setData({ actionField: { id: "", show: false } })
    },

    // 重置当前类型列表
    onUpdate() {
      this.fetchProducts({
        listing: this.data.listData.type === "listing",
        pageNo: 1
      })
    },

    // 添加商品
    onAddProduct() {
      const procedure = procedures.open("merchant-product-editor")

      procedure.asCaller().on("success", id => {
        wx.navigateBack()
        this.fetchProducts({ listing: false, pageNo: 1 })
        this.setData({
          "listData.type": "delisting"
        })
      })
    },

    //todo 设置预售
    setPreSale() { },

    //todo 设置置顶
    setProductSticky() { },

    // 加载更多
    // todo hasmore
    async onReachBottom() {
      const { listData } = this.data
      const result = await Api.MerchantProduct.list({
        listing: listData.type === "listing",
        pageNo: listData.pageNo
      })

      if (result.length) {
        this.setData({
          "listData.list": listData.list.concat(result),
          "listData.pageNo": listData.pageNo + 1
        })
      }
    },

    // 分享商品
    onShareAppMessage: function ({ target }) {
      const { userProfile, sellerProfile, listData } = this.data
      const id = target.dataset.id || ""
      const targetProduct = listData.list.find(product => product.id == id)
      return !!id
        ? share.shareProduct(targetProduct, sellerProfile.employee.referrerId, sellerProfile.shop.id)
        : share.shareShop(sellerProfile.employee.referrerId, sellerProfile.shop.id)
    }
  })
)
