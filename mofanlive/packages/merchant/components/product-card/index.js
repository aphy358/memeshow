const {
  router,
  procedures,
  Api
} = wx.X

Component({
  properties: {
    product: Object,

    onSale: {
      type: Boolean,
      value: true
    }
  },

  data: {
    internalBuy: {
      show: false,
      setted: false,
      couponCount: "",
      endTime: "",
      endTimeDesc: "",
      startTime: "",
      startTimeDesc: ""
    }
  },

  observers: {
    // 初始化内购信息
    product(product) {
      const internalBuy = product.neigou
      if (internalBuy) {
        const startTimeDesc = formatTime(internalBuy.startTime)
        const endTimeDesc = formatTime(internalBuy.endTime)

        this.setData({
          internalBuy: {
            ...this.data.internalBuy,
            ...internalBuy,
            setted: true,
            startTimeDesc,
            endTimeDesc
          }
        })
      }
    }
  },

  methods: {
    // 编辑商品
    onEditProduct() {
      const instance = procedures.open("merchant-product-editor")
      instance.asCaller().emit("init", this.data.product.id)
      instance.asCaller().on("success", id => {
        wx.navigateBack()
        this.triggerEvent(
          "edit",
          {},
          {
            bubbles: true
          }
        )
      })
    },

    // 删除商品
    async onDeleteProduct() {
      try {
        await Api.MerchantProduct.delete(this.data.product.id)
        this.triggerEvent(
          "delete",
          {
            id: this.data.product.id
          },
          {
            bubbles: true
          }
        )
      } catch (e) {
        // todo 删除失败
        wx.showToast({
          icon: "none",
          title: `删除失败: ${e}`
        })
      }
    },

    // 商品上架
    onShelves() {
      const { product } = this.data
      Api.MerchantProduct.onShelves(product.id).then(res => {
        wx.showToast({
          title: "上架成功"
        })
        this.triggerEvent(
          "listing",
          {
            id: product.id
          },
          {
            bubbles: true
          }
        )
      })
    },

    // 点击“更多”
    onMoreActions() {
      this.triggerEvent("more", { id: this.data.product.id }, { bubbles: true })
    },

    // 展示 modal
    showInternalBuy() {
      this.setData({
        "internalBuy.show": true
      })
    },

    // 是否设置内购信息
    onSetInternalBuy({ detail }) {
      this.setData({
        "internalBuy.setted": detail.value == "1"
      })
    },

    // 设置内购券
    onChangeInternalBuyCost({ detail }) {
      this.setData({
        "internalBuy.couponCount": Number(detail.value)
      })
    },

    // 设置内购开始时间
    onChangeInternalBuyStartTime({ detail }) {
      const timeStr = detail.value
      this.setData({
        "internalBuy.startTimeDesc": timeStr,
        "internalBuy.startTime": Number(
          new Date(`${timeStr}T00:00:00`).getTime()
        )
      })
    },

    // 设置内购结束时间
    onChangeInternalBuyEndTime({ detail }) {
      const timeStr = detail.value
      this.setData({
        "internalBuy.endTimeDesc": timeStr,
        "internalBuy.endTime": Number(new Date(`${timeStr}T23:59:59`).getTime())
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

    async onConfirmInternalBuy() {
      const { internalBuy, product } = this.data
      let neigou = internalBuy.setted
        ? {
            couponCount: internalBuy.couponCount,
            startTime: internalBuy.startTime,
            endTime: internalBuy.endTime
          }
        : null

      try {
        // 修改 sku 的内购信息
        const { skus } = await Api.MerchantProduct.detail(product.id)
        let newSkus = skus.map(sku => ({
          id: sku.id,
          neigou: neigou
            ? {
                ...sku.neigou,
                ...neigou
              }
            : null
        }))

        const result = await Api.MerchantProduct.update({
          id: product.id,
          skus: newSkus
        })

        this.setData({ "internalBuy.show": false })
        wx.showToast({ title: "设置成功" })
        this.triggerEvent("update", {}, { bubbles: true })
      } catch (e) {
        this.setData({ "internalBuy.show": false })
        wx.showToast({
          icon: "none",
          title: `更新内购券失败：${e}`
        })
      }
    },

    // 跳转商品详情
    goToProductDetail() {
      router.navigate("product", { id: this.data.product.id })
    }
  }
})

function formatTime(timestamp) {
  const seed = new Date(timestamp)
  let year = seed.getFullYear()
  let month = seed.getMonth() + 1
  let date = seed.getDate()

  if (month < 10) month = "0" + month
  if (date < 10) date = "0" + date

  return year + "-" + month + "-" + date
}
