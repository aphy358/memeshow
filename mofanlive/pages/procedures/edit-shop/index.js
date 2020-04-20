import { connectPage } from "wx-redux"
import { chooseImage, uploadImage } from '@/utils/cos'
import { safeArea } from "ui-kit/behaviors"
import _ from 'lodash'
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  behaviors: [safeArea()],

  data: {
    background: "",
    avatar: "",
    background: "",
    categories: [],
    ctime: 0,
    description: "",
    email: "",
    followers: 0,
    id: 0,
    live: false,
    mobile: "",
    name: "",
    products: 0,
    qq: "",
    sellerId: "",
    wechat: "",
    wechatCode: "",

    category: {
      list: [],
      range: [],
      current: [],
      text: "",
    },

    updatingField: {},
    sid: "",
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    wx.X.procedures.get(this.data.sid).register(this)

    this.init()
  },

  onUnload() {
    const instance = wx.X.procedures.get(this.data.sid)
    if (!!instance) {
      instance.asProcedure().emit("complete")
    }
  },

  async init() {
    const shop = await wx.X.Api.MerchantShop.retrieve()

    const platCategories = await wx.X.Api.MerchantCategory.platmCategories()
    const current = [0, 0]
    const range = [
      _.map(platCategories, it => ({
        id: it.id,
        name: it.name,
      })),
      _.map(platCategories[0].children, it => ({
        id: it.id,
        name: it.name,
      }))
    ]

    var text = ""
    if (shop.categories && shop.categories.length > 0) {
      text = _.reduce(shop.categories, (res, it) => res + " " + it.name, "")
    }

    this.setData({
      ...shop,
      "category.list": platCategories,
      "category.current": current,
      "category.range": range,
      "category.text": text,
    })
  },

  async changeAvatar() {
    const filePath = await chooseImage({
      sizeType: ['original']
    })
    const basicUrl = await uploadImage(filePath)
    const imgSize = "?imageView2/1/w/100/h/100"
    const url = basicUrl + imgSize
    this.data.updatingField.avatar = url
    this.setData({
      avatar: url
    })
  },

  async changeBackground() {
    const filePath = await chooseImage({
      sizeType: ['original']
    })
    const basicUrl = await uploadImage(filePath)
    const imgSize = "?imageView2/1/w/750/h/486"
    const url = basicUrl + imgSize
    this.data.updatingField.background = url
    this.setData({
      background: url
    })
  },

  changeAddress() {
    const instance = wx.X.procedures.open("address-selector")
    instance.asCaller().on("complete", data => {
      this.setData({ returnAddress: data })
      wx.X.Api.MerchantShop.updateReturnAddress({
        name: data.name,
        tel: data.tel,
        province: data.province,
        city: data.city,
        district: data.district,
        address: data.address,
        postalCode: data.postalCode || "",
      })
    })
  },

  changeText(e) {
    const field = e.currentTarget.dataset.field
    const singleLine = e.currentTarget.dataset.single
    const instance = wx.X.procedures.open("text-editor")
    const emitter = instance.asCaller()

    const placeholderMap = {
      "name": "请输入店铺名",
      "description": "请输入店铺简介",
      "mobile": "请输入手机号码",
      "wechat": "请输入微信号",
    }

    emitter.emit("init", {
      text: this.data[field],
      singleLine: singleLine == '1',
      placeholder: placeholderMap[field],
    })
    emitter.on("complete", data => {
      if (!data) return
      this.data.updatingField[field] = data.text
      this.setData({
        [field]: data.text
      })
    })
  },

  changeCategory(e) {
    const { detail } = e
    const c = this.data.category
    this.setData({
      "category.text": `${c.range[0][detail.value[0]].name} ${c.range[1][detail.value[1]].name}`
    })
    this.data.updatingField.categoryIds = [c.range[0][detail.value[0]].id, c.range[1][detail.value[1]].id]
  },

  updateCategoryColumn(e) {
    const { detail } = e
    if (detail.column != 0) return;
    const category = this.data.category
    const id = category.range[0][detail.value].id
    const c = _.find(category.list, it => it.id === id)
    this.setData({
      "category.range[1]": _.map(c.children, it => ({
        id: it.id,
        name: it.name,
      })),
      "category.current": [detail.value, 0],
    })
  },

  updateUserInfo() {
    if (!!this.data.updatingField) {
      const res = wx.X.Api.MerchantShop.update({
        ...this.data.updatingField,
        id: this.data.id
      })
      wx.showToast({
        title: "更新成功"
      })
    }
    setTimeout(() => {
      wx.navigateBack({ delta: 1 })
    }, 1000)
  },

  manageStaff() {
    router.go("manageStaff")
  },

  options: {
    addGlobalClass: true
  }
}))