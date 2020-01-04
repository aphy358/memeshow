import { productList } from "@/data/product"
import { connectPage } from 'wx-redux'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  data: {
    id: "",
    list: [],
    seller: {
      avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577450822914&di=44b4e3df9b107ca7b1c3d4297de2bf68&imgtype=0&src=http%3A%2F%2Fpics5.baidu.com%2Ffeed%2F9825bc315c6034a8d0d8b3b3a93b2751092376f3.png%3Ftoken%3D45f963d33a1ad7a88e263b0ba3b73aee%26s%3DC3A8BB47323A279A5808C9B00300F053",
      live: true
    }
  },

  onLoad(options) {
    this.data.id = options.id
  },

  onReady() {
    this.init()
  },

  init() {
    this.setData({
      list: productList
    })
  },

  search(e) {
    console.log(e)
  }
}))