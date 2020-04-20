const procedures = wx.X.procedures
const Api = wx.X.Api

Page({
  data: {
    // 标记是否是更新
    isUpdate: false,

    // immutable 基础数据
    pureList: {
      shopCategories: [],
      platformCategories: []
    },

    // 规格信息
    skus: [],

    // 平台分类
    platformCategory: {
      ids: [],
      names: [],
      desc: ""
    },

    // 店铺分类
    shopCategory: {
      ids: [],
      names: [],
      desc: ""
    },

    // 内购信息
    neigou: {
      show: false,
      couponCount: 1,
      startTime: new Date(`${formatTime(Date.now())}T00:00:00`).getTime(),
      startTimeDesc: formatTime(Date.now()),
      endTime: new Date(`${getTimelater(30)}T23:59:59`).getTime(),
      endTimeDesc: getTimelater(30)
    },

    presale: {
      show: false,
      time: 0,
      timeDesc: ""
    },

    // 描述详情
    description: {
      desc: "",
      metadata: {
        descMetaData: {}
      }
    },

    // base product DTO
    formData: {
      title: "",
      media: [],
      price: 0,
      originPrice: 0,
      stock: 0
    },

    // 全局价格错误提示
    warning: {
      show: false,
      text: ""
    },

    // 更新商品的初始数据
    initImages: [],
    singleNeigouPrice: 0
  },

  onLoad(params) {
    this.data.sid = params.sid
    this.initPlatformCategory()
    this.initShopCategory()
  },

  onReady() {
    this.data.procedure = procedures.get(this.data.sid)
    this.data.procedure.register(this)

    // 如果是更新，初始化数据
    this.data.procedure.asProcedure().on("init", productid => {
      this.setData({ isUpdate: true }) // 标记是更新
      wx.setNavigationBarTitle({ title: "修改商品" })
      this.initProduct(productid)
    })
  },

  onUnload() {
    this.data.procedure.asProcedure().emit("complete")
  },

  // 初始化平台分类
  async initPlatformCategory() {
    const categories = await Api.MerchantCategory.platmCategories()
    this.setData({ "pureList.platformCategories": categories })
  },

  // 初始化店铺分类
  async initShopCategory() {
    const categories = await Api.MerchantCategory.shopCategories()
    this.setData({ "pureList.shopCategories": categories })
  },

  // 更新商品，初始化商品信息
  async initProduct(productid) {
    const product = await Api.MerchantProduct.detail(productid)

    const {
      pureList,
      shopCategory,
      platformCategory,
      formData,
      description
    } = this.data

    // 拆解数据
    shopCategory.ids = product.shopCategoryIds || []
    platformCategory.ids = product.platformCategoryIds || []

    // 匹配普通数据
    let initImages = product.medias.map(media => media.url)
    formData.media = initImages
    formData.id = product.id
    formData.title = product.title
    formData.stock = product.stock
    formData.price = product.price
    formData.originPrice = product.originPrice

    // 匹配店铺分类
    if (shopCategory.ids && shopCategory.ids.length) {
      shopCategory.names = shopCategory.ids.map(id => {
        const target = pureList.shopCategories.find(cat => cat.id == id)
        return target ? target.name : ""
      })
      shopCategory.desc = shopCategory.names.join(",")
    }

    // 匹配平台分类
    if (platformCategory.ids && platformCategory.ids.length) {
      const list = [...platformCategory.ids]
      let trees = pureList.platformCategories

      // 遍历森林
      while (trees && trees.length) {
        let target = trees.find(node => node.id == list[0])
        if (target) {
          platformCategory.names.push(target.name)
          list.shift()
          trees = target.children
        } else {
          break
        }
      }

      platformCategory.desc = platformCategory.names.join("/")
    }

    // 还原描述详情
    description.desc = product.desc
    if (product.metadata) {
      description.metadata = product.metadata
    }

    // 还原 sku 和 neigou
    let skus = product.skus
    let neigou = {}
    if (skus && skus.length) {
      if (skus.length === 1 && !(skus[0].specs && skus[0].specs.length)) {
        // 默认生成的 sku，不用特殊处理
        formData.neigou = skus[0].neigou
        skus = []
      } else {
        neigou = skus[0].neigou
        // 有规格项，要解析出来
        skus = skus.map(sku => ({
          id: sku.id,
          tempId: sku.id,
          stock: sku.stock,
          price: sku.price,
          specValue: sku.specs[0].v, // todo 目前仅支持一个规格项目
          originPrice: sku.originPrice
        }))
      }
    }

    if (neigou && neigou.startTime) {
      neigou.show = true
      if (neigou.startTime) neigou.startTimeDesc = formatTime(neigou.startTime)
      if (neigou.endTime) neigou.endTimeDesc = formatTime(neigou.endTime)
    }

    this.setData({
      skus,
      neigou,
      formData,
      initImages,
      shopCategory,
      platformCategory,
      description
    })
  },

  // 修改商品名称
  onChangeTitle({ detail }) {
    this.setData({ "formData.title": detail.value })
  },

  // 修改商品大图
  onChangeMedia({ detail }) {
    this.setData({ "formData.media": detail })
  },

  // 修改商品详情描述
  onChangeDescription() {
    const { description } = this.data
    const instance = procedures.open("merchant-product-descriptor")
    // 如果有数值初始化
    instance.asCaller().emit("init", {
      texts: description.metadata.descMetaData.texts || [],
      images: description.metadata.descMetaData.images || []
    })
    instance.asCaller().on("change", ({ meta, desc }) => {
      this.setData({
        "description.desc": desc,
        "description.metadata.descMetaData": meta
      })
    })
  },

  // 修改平台分类
  onChangePlatmCategory() {
    const instance = procedures.open("merchant-platm-category")
    instance.asCaller().emit("init", {
      categories: [...this.data.pureList.platformCategories]
    })
    instance.asCaller().on("choose", ({ categories, deepth }) => {
      if (categories.length) {
        const ids = categories.map(cat => cat.id)
        const names = categories.map(cat => cat.name)
        this.setData({
          platformCategory: {
            ids,
            names,
            desc: names.join("/")
          }
        })
      }
      if (deepth)
        wx.navigateBack({
          delta: deepth
        })
    })
  },

  // 修改店铺分类
  onChangeShopCategory() {
    const instance = procedures.open("merchant-category")
    instance.asCaller().emit("init", this.data.shopCategory.ids)
    instance.asCaller().on("choose", categories => {
      if (categories.length) {
        const ids = categories.map(cat => cat.id)
        const names = categories.map(cat => cat.name)
        this.setData({
          shopCategory: {
            ids,
            names,
            desc: names.join(",")
          }
        })
      }
    })
  },

  // 增加规格
  onAddSpec() {
    const { skus } = this.data
    skus.push({
      tempId: Date.now()
    })
    this.setData({ skus })
  },

  // 删除规格
  onDeleteSpec(event) {
    const { dataset } = event.target
    const { skus } = this.data
    const index = skus.findIndex(spec => spec.tempId === (dataset.tempid || 0))
    if (index !== -1) {
      skus.splice(index, 1)
      this.setData({ skus })
    }
  },

  // 修改无 sku 时的库存
  onChangeSingleStock({ detail }) {
    this.setData({
      "formData.stock": Number(detail.value) || 0
    })
  },

  // 修改无 sku 时的价格
  onChangeSinglePrice({ detail }) {
    const { formData } = this.data
    formData.price = detail.value ? detail.value * 100 : 0
  },

  // 确认无 sku 时的价格
  onConfirmSinglePrice({ detail }) {
    const value = detail.value ? detail.value * 100 : 0
    const { formData, neigou } = this.data

    if (
      !neigou.show ||
      !formData.neigou ||
      !formData.neigou.price ||
      value - formData.neigou.price >= 100
    ) {
      this.setData({
        "formData.price": value,
        warning: {
          show: false,
          text: ""
        }
      })
    } else {
      this.setData({
        warning: {
          show: true,
          text: "单买价需要比内购价格高至少1元，请重新设置"
        }
      })
    }
  },

  // 修改无 sku 时的内购价
  onChangeSingleInternalBuyPrice({ detail }) {
    const { formData } = this.data
    if (!formData.neigou) formData.neigou = {}
    formData.neigou.price = detail.value * 100
  },

  // 确认无 sku 时的内购价
  onConfirmsingleInternalBuyPrice({ detail }) {
    const { formData } = this.data
    const value = Number(detail.value) * 100
    if (!value || !formData.neigou) return
    if (!formData.price) {
      // 还未填写单买价，自动填写
      formData.price = value + 100
      formData.neigou.price = value
      this.setData({
        formData,
        warning: {
          show: false,
          text: ""
        }
      })
    } else if (formData.price - value < 100) {
      // 已经填写，不符合规则给一个提示
      this.setData({
        warning: {
          show: true,
          text: "单买价需要比内购价格高至少1元，请重新设置"
        }
      })
    } else {
      formData.neigou.price = value
      this.setData({
        formData,
        warning: {
          show: false,
          text: ""
        }
      })
    }
  },

  // 修改无 sku 商品市场价格
  onChangeSingleMarketPrice({ detail }) {
    const { formData } = this.data
    formData.originPrice = detail.value * 100
  },

  // 确认无 sku 商品市场价格
  onConfirmSingleMarketPrice({ detail }) {
    this.setData({ "formData.originPrice": detail.value * 100 })
  },

  // 修改 sku 规格
  onChangeSkuSpec({ target, detail }) {
    const tempId = target.dataset.id
    const value = detail.value
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      sku.specValue = value
    }
  },

  // 修改 sku 库存
  onChangeSkuStock({ target, detail }) {
    const tempId = target.dataset.id
    const value = Number(detail.value)
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      sku.stock = value
    }
  },

  // 修改 sku 价格
  onChangeSkuPrice({ target, detail }) {
    const tempId = target.dataset.id
    const value = Number(detail.value) * 100
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      sku.price = value
    }
  },

  // 确认 sku 价格
  onConfirmSkuPrice({ target, detail }) {
    const { neigou } = this.data
    const tempId = target.dataset.id
    const value = Number(detail.value) * 100
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      if (
        !neigou.show ||
        !sku.neigou ||
        !sku.neigou.price ||
        value - sku.neigou.price >= 100
      ) {
        delete sku.warning
        sku.price = value
      } else {
        sku.warning = "单买价需要比内购价格高至少1元，请重新设置"
        this.setData({ skus: this.data.skus })
      }
    }
  },

  // 修改 sku 内购价
  onChangeSkuInternalBuyPrice({ target, detail }) {
    const tempId = target.dataset.id
    const value = detail.value
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      if (!sku.neigou) sku.neigou = {}
      sku.neigou.price = value * 100
    }
  },

  onConfirmSkuInternalBuyPrice({ target, detail }) {
    const tempId = target.dataset.id
    const value = Number(detail.value) * 100
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      if (!sku.neigou) sku.neigou = {}

      if (!sku.price) {
        // 还未填写单买价，自动填写
        sku.price = value + 100
        sku.neigou.price = value
        delete sku.warning
      } else if (sku.price - value < 100) {
        // 已经填写，不符合规则给一个提示
        sku.warning = "单买价需要比内购价格高至少1元，请重新设置"
      } else {
        sku.neigou.price = value
        delete sku.warning
      }
      this.setData({ skus: this.data.skus })
    }
  },

  // 修改 sku 市场价
  onChangeSkuMarketPrice({ target, detail }) {
    const tempId = target.dataset.id
    const value = detail.value
    let sku = this.data.skus.find(sku => sku.tempId == tempId)
    if (sku) {
      sku.originPrice = value * 100
    }
  },

  // 设置是否需要内购券
  setInternalBuy({ detail }) {
    this.setData({
      "neigou.show": detail.value === "true"
    })
  },

  // 设置内购券数量
  setInternalBuyVouchers({ detail }) {
    this.setData({ "neigou.couponCount": Number(detail.value) })
  },

  // 设置内购开始时间
  setInternalBuyStartTime({ detail }) {
    this.setData({
      "neigou.startTime": new Date(`${detail.value}T00:00:00`).getTime(),
      "neigou.startTimeDesc": detail.value
    })
  },

  // 设置内购结束时间
  setInternalBuyEndTime({ detail }) {
    this.setData({
      "neigou.endTime": new Date(`${detail.value}T23:59:59`).getTime(),
      "neigou.endTimeDesc": detail.value
    })
  },

  // 显示内购说明
  onShowInternalbuyHelp() {
    wx.showModal({
      title: "内购券说明",
      content:
        "用户需通过分享店铺、每日签到等任务获得店铺内购券，商品设置内购券后，用户需领取达到数额内购券才可以内购价购买，快快鼓励用户分享领券吧！",
      showCancel: false
    })
  },

  // 设置预售
  setPresale({ detail }) {
    this.setData({
      "presale.show": detail.value === "true"
    })
  },

  // 提交表单
  async onSubmit() {
    // 设置规格
    if (this.data.skus.length) await this.createSpec()
    // 设置内购
    if (this.data.neigou.show) this.setInternalBuyFormData()
    // 设置其他数据
    this.data.formData.shopCategoryIds = this.data.shopCategory.ids || []
    this.data.formData.platformCategoryIds =
      this.data.platformCategory.ids || []
    this.data.formData.desc = this.data.description.desc
    this.data.formData.metadata = this.data.description.metadata

    if (!this.data.isUpdate) {
      let result = await Api.MerchantProduct.create(this.data.formData)
      if (result && result.id) {
        wx.showToast({
          title: "创建成功",
          success: () => {
            this.data.procedure.asProcedure().emit("success", result.id)
          }
        })
      } else {
        wx.showToast({
          title: "创建失败",
          icon: "none"
        })
      }
    } else {
      let result = await Api.MerchantProduct.update(this.data.formData)
      if (result && result.id) {
        wx.showToast({
          title: "更新成功",
          success: () => {
            this.data.procedure.asProcedure().emit("success", result.id)
          }
        })
      } else {
        wx.showToast({
          title: "更新失败",
          icon: "none"
        })
      }
    }
  },

  // 创建规格项目和规格值
  async createSpec() {
    const { skus, formData } = this.data
    const prop = await Api.MerchantProduct.createProp("商品规格")
    const values = skus.map(sku => sku.specValue)
    if (!values.length) return
    let specs = await Api.MerchantProduct.createPropValue({
      values,
      kid: prop.id
    })
    specs = specs.values
    formData.skus = []
    skus.forEach((sku, index) => {
      const target = specs.find(spec => spec.v == sku.specValue)
      if (target) {
        const skuData = sku.id
          ? {
              id: sku.id,
              price: sku.price,
              stock: sku.stock,
              originPrice: sku.originPrice,
              specs: [
                {
                  kid: prop.id,
                  vid: target.vid
                }
              ],
              neigou: sku.neigou || {}
            }
          : {
              price: sku.price,
              stock: sku.stock,
              originPrice: sku.originPrice,
              specs: [
                {
                  kid: prop.id,
                  vid: target.vid
                }
              ],
              neigou: sku.neigou || {}
            }
        formData.skus.push(skuData)
      }
    })
  },

  // 设置内购
  setInternalBuyFormData() {
    const { neigou, formData, skus } = this.data
    if (formData.skus && formData.skus.length) {
      // 有 sku 的情况, 写到每一个 sku 里
      formData.skus.forEach(sku => {
        if (!sku.neigou) sku.neigou = {}
        sku.neigou.couponCount = neigou.couponCount
        sku.neigou.startTime = neigou.startTime
        sku.neigou.endTime = neigou.endTime
      })
    } else {
      // 无 sku，写到外层
      if (!formData.neigou) formData.neigou = {}
      formData.neigou.couponCount = neigou.couponCount
      formData.neigou.startTime = neigou.startTime
      formData.neigou.endTime = neigou.endTime
    }
  }
})

function formatTime(timestamp) {
  const date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month < 10) month = "0" + month
  if (day < 10) day = "0" + day

  return year + "-" + month + "-" + day
}

function getTimelater(day) {
  const later = new Date()
  later.setDate(later.getDate() + day)
  return formatTime(later.getTime())
}
