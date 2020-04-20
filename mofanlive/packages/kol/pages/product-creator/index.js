import Utils from "../../utils"
import { connectPage } from "wx-redux"

Page(connectPage(
  state => ({}),
  dispatch => ({}),
)({
  data: {
    title: "",  // 商品名
    price: null,   // 价格
    images: [], // 图片

    emptyShop: true,
  },
  onLoad(options) { },

  createProduct() {
    const { title, price, images } = this.data
    console.log(title, price, images)
  },

  onInputPrice({ detail: { value } }) {
    this.setData({
      price: value ? value : null
    })
  },

  onInputTitle({ detail: { value } }) {
    this.setData({
      title: value
    })
  },

  onImageUpload({ detail }) {
    this.setData({ images: detail })
  },

  options: {
    addGlobalClass: true
  }
}))