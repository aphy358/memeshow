import common from "../../utils"
import share from "../../../../utils/share.js"
import { safeArea } from "ui-kit/behaviors"
import { connectComponent } from "wx-redux"

const IM = wx.X.IM
const Api = wx.X.Api
const procedures = wx.X.procedures
const router = wx.X.router

Component(
  connectComponent(
    state => ({
      userProfile: state.userProfile,
      sellerProfile: state.sellerProfile
    }),
    dispatch => ({})
  )({
    properties: {
      // 直播间id
      id: String
    },

    data: {
      // 直播间的信息
      roomInfo: { streamUrl: {} },

      // 直播商品列表
      products: [],

      // 正在讲解的商品
      currentProduct: null,

      // 商品选择器选中的商品缓存
      cacheProducts: [],

      // 是否打开直播商品列表
      showProducts: false,

      // 是否打开商品选择器
      showProductSelector: false,

      timer: {
        identifier: 0,
        // 直播时间，单位 s
        clock: 0
      },

      // 直播的设置
      settings: {
        mode: "FHD",
        enableCamera: true,
        devicePosition: "front",
        enableMic: true,
        mirror: false,
        beauty: false
      }
    },

    behaviors: [safeArea()],

    methods: {
      onLoad({ roomId }) {
        this.initLiveRoom({ roomId })
      },

      onUnload() {
        this.clearTimer()
        this.destroyRoom()
      },

      // 初始化直播间信息
      async initLiveRoom({ roomId }) {
        if (roomId) {
          const roomInfo = await Api.MerchantLive.getRoomDetail(roomId)
          this.setData({ roomInfo })
          try {
            await this.startLivePush()

            // 直播计时
            this.setTimer()

            // 加入 IM 群组
            IM.joinLiveRoom(roomInfo.im.groupId)
          } catch (e) {
            // todo 推流失败的提示，可以根据错误码匹配
          }
        }
      },

      // 获取推流 context
      getPusher() {
        if (this.liveContext) return this.liveContext
        else return wx.createLivePusherContext("pusher")
      },

      // 直播推流
      startLivePush() {
        return new Promise((resolve, reject) => {
          const context = this.getPusher()
          // todo : 配置 Mode
          context.start({
            success: res => resolve(res),
            fail: err => reject(err)
          })
        })
      },

      // 直播设置
      onSettingsChange({ detail }) {
        const { settings } = this.data
        const { type, value } = detail
        if (!type || typeof settings[type] === "undefined") return
        if (type === "devicePosition") this._switchCamera(value)
        if (type === "mode") this._changeQuality()
        settings[type] = value
        this.setData({ settings })
      },

      // 关播
      onCloseLive() {
        // todo 使用自己的 modal
        wx.showModal({
          content: "是否关闭直播",
          success: async res => {
            if (res.confirm) {
              // await this.destroyRoom()
              router.go("merchantCenter")
            } else if (res.cancel) {
              // 继续直播
            }
          }
        })
      },

      // 设置直播间的计时器
      setTimer() {
        const { roomInfo, timer } = this.data
        if (timer.identifier) clearInterval(timer.identifier)
        timer.identifier = setInterval(() => {
          this.data.timer.clock++
          // 主播心跳
          if (!(timer.clock % 5)) Api.MerchantLive.heartbeat(roomInfo.id)
          this.setData({ timer })
        }, 1000)
      },

      // 清除直播间计时器
      clearTimer() {
        const identifier = this.data.timer.identifier
        if (identifier) clearInterval(identifier)
      },

      // 销毁直播间
      async destroyRoom() {
        const { roomInfo } = this.data
        await Api.Live.destroyRoom(roomInfo.id)
      },

      // 获取商品选择器列表
      async fetchProducts() {
        try {
          const selectorProducts = await Api.MerchantProduct.list({
            listing: true,
            lastProductId: this.data.cursor
          })

          this.setData({
            showProductSelector: true,
            cacheProducts: [...this.data.products],
            selectorProducts: this._checkedValidator(
              this.data.products,
              selectorProducts
            )
          })
        } catch (e) {
          wx.showModal({
            content: `获取商品失败${e}`
          })
        }
      },

      // 选择商品的 procedures
      // selectProduct() {
      //   let { products, roomInfo } = this.data
      //   const instance = procedures.open("product-selector")

      //   if (products.length) {
      //     instance.asCaller().emit("init", products)
      //   }

      //   instance.asCaller().on("confirm", res => {
      //     if (res && res.length > 0) {
      //       const { list1: addProducts, list2: removeProducts } = deduplicate(
      //         res,
      //         products
      //       )

      //       // todo 讲解中的无法 delete

      //       // 添加新的商品
      //       if (addProducts.length) {
      //         Api.MerchantLive.addProducts({
      //           roomId: roomInfo.id,
      //           productIds: addProducts.map(product => product.id)
      //         })
      //       }

      //       // 删除老的商品
      //       if (removeProducts.length) {
      //         Api.MerchantLive.removeProducts({
      //           roomId: roomInfo.id,
      //           productIds: removeProducts.map(product => product.id)
      //         })
      //       }

      //       this.setData({ products: res })
      //     }
      //   })
      // },

      //  点击购物袋
      onClickShop() {
        let { products } = this.data

        if (!products.length) {
          // 没商品先添加商品
          // this.selectProduct()
          this.fetchProducts()
        } else {
          // 有商品选择商品
          this.setData({ showProducts: true })
        }
      },

      // 添加直播商品
      onAddProduct() {
        // this.selectProduct()
        this.setData({ showProducts: false })
        wx.nextTick(() => this.fetchProducts())
      },

      // 选择直播商品
      onSelect({ mark }) {
        const index = mark.index
        if (typeof index === "undefined") return

        const { selectorProducts, cacheProducts } = this.data
        const target = selectorProducts[Number(index)]

        if (!target.ischecked) {
          // 选中
          target.ischecked = true
          const { ischecked, ...product } = target
          cacheProducts.push(product)
        } else {
          //  取消选中
          target.ischecked = false
          const dirty = cacheProducts.findIndex(
            product => product.id == target.id
          )
          if (dirty >= 0) cacheProducts.splice(dirty, 1)
        }
        this.setData({
          selectorProducts,
          cacheProducts
        })
      },

      // 确认商品选择器选中的商品
      onConfirmSelector() {
        let { products, roomInfo, cacheProducts } = this.data

        const { list1: addProducts, list2: removeProducts } = deduplicate(
          cacheProducts,
          products
        )

        // todo 讲解中的无法 delete

        // 添加新的商品
        if (addProducts.length) {
          Api.MerchantLive.addProducts({
            roomId: roomInfo.id,
            productIds: addProducts.map(product => product.id)
          })
        }

        // 删除老的商品
        if (removeProducts.length) {
          Api.MerchantLive.removeProducts({
            roomId: roomInfo.id,
            productIds: removeProducts.map(product => product.id)
          })
        }

        this.setData({
          products: [...cacheProducts],
          showProductSelector: false
        })
      },

      // 删除直播商品
      async onDelProduct({ target }) {
        const index = target.dataset && target.dataset.index
        const { products, currentProduct, roomInfo } = this.data
        if (typeof index !== "undefined") {
          if (
            currentProduct &&
            products[Number(index)].id == currentProduct.id
          ) {
            // 删除正在讲解提示
            wx.showModal({
              content: "你确定要取消讲解并删除商品吗？",
              success: async res => {
                if (res.confirm) {
                  try {
                    // 先取消正在讲解
                    await Api.MerchantLive.removeExplainProduct({
                      roomId: roomInfo.id,
                      productId: currentProduct.id
                    })

                    // 再删除
                    await Api.MerchantLive.removeProducts({
                      roomId: roomInfo.id,
                      productIds: [currentProduct.id]
                    })

                    products.splice(Number(index), 1)
                    this.setData({
                      products,
                      currentProduct: null
                    })
                  } catch (e) {
                    // todo
                  }
                } else if (res.cancel) {
                  // 取消删除操作
                }
              }
            })
          } else {
            try {
              await Api.MerchantLive.removeProducts({
                roomId: roomInfo.id,
                productIds: [products[Number(index)].id]
              })
              products.splice(Number(index), 1)
              this.setData({ products })
            } catch (e) {
              // todo 删除失败
            }
          }
        }
      },

      // 选择正在讲解的商品
      async onSelectProduct({ target }) {
        const index = target.dataset.index
        if (typeof index === "undefined") return

        const { products, roomInfo, currentProduct } = this.data
        const product = products[Number(index)]

        if (currentProduct && product.id === currentProduct.id) {
          this.onCloseProduct()
        } else {
          try {
            await Api.MerchantLive.setExplainProduct({
              roomId: roomInfo.id,
              productId: product.id
            })
            this.setData({
              currentProduct: {
                ...product,
                position: index + 1
              }
            })
          } catch (e) {
            // todo 选择商品失败提示
          }
        }
      },

      // 结束讲解
      async onCloseProduct() {
        const { currentProduct, roomInfo } = this.data
        try {
          await Api.MerchantLive.removeExplainProduct({
            roomId: roomInfo.id,
            productId: currentProduct.id
          })
          this.setData({ currentProduct: null })
        } catch (e) {
          // todo
        }
      },

      // 滑动开始
      onSlideStart(e) {
        const { products } = this.data
        const { currentTarget, changedTouches } = e
        const index = currentTarget.dataset && currentTarget.dataset.index

        if (typeof index !== "undefined") {
          products[Number(index)].startX = changedTouches[0].clientX
          products[Number(index)].startY = changedTouches[0].clientY
        }

        this.setData({ products })
      },

      // 滑动
      onSlideMove(e) {
        const { products } = this.data
        const { currentTarget, changedTouches } = e

        // 获取滑动开始的信息
        const index = currentTarget.dataset && currentTarget.dataset.index
        const startX = currentTarget.dataset && currentTarget.dataset.startx
        const startY = currentTarget.dataset && currentTarget.dataset.starty
        const endX = changedTouches[0].clientX
        const endY = changedTouches[0].clientY

        if (typeof index !== "undefined") {
          const angle = getAngle(
            {
              X: startX,
              Y: startY
            },
            {
              X: endX,
              Y: endY
            }
          )

          // 超过30度并且滑动距离低于30默认为不滑动
          if (Math.abs(angle) > 30 || Math.abs(startX - endX) < 100) return
          // 判断左滑和右滑
          if (endX > startX) products[Number(index)].isTouchMove = false
          else products[Number(index)].isTouchMove = true

          this.setData({ products })
        }
      },

      // 关闭直播商品列表弹窗
      onClosePopup() {
        this._resetSlide()
        if (this.data.showProducts) {
          this.setData({ showProducts: false })
        }
      },

      onClickClosePopup() {
        this.setData({ showProducts: false })
      },

      // 关闭商品选择器
      onCloseSelector() {
        if (this.data.showProductSelector)
          this.setData({
            cacheProducts: [],
            showProductSelector: false
          })
      },

      onClickCloseSelector() {
        if (this.data.products.length) {
          this.setData({
            cacheProducts: [],
            showProductSelector: false
          })
          wx.nextTick(() => this.setData({ showProducts: true }))
        } else {
          this.setData({
            cacheProducts: [],
            showProductSelector: false
          })
        }
      },

      _changeQuality() {
        const context = this.getPusher()
        context.pause()
        wx.nextTick(() => context.resume())
      },

      _switchCamera(camera) {
        const context = this.getPusher()
        context.switchCamera()
      },

      // 重置 slide 数据，清除滑动的信息
      _resetSlide() {
        this.data.products.forEach(product => {
          if (product.isTouchMove) product.isTouchMove = false
        })
        this.setData({ products: this.data.products })
      },

      // 检查products中是否有已经选择的数据
      _checkedValidator(list, products) {
        if (list && list.length) {
          list.forEach(item => {
            const index = products.findIndex(product => product.id == item.id)
            if (index >= 0) products[index].ischecked = true
          })
        }

        return products
      },

      onShareAppMessage() {
        const { userProfile, roomInfo } = this.data
        const { shop, employee } = this.data.sellerProfile
        return share.shareLive(
          userProfile,
          employee.referrerId,
          shop.id,
          roomInfo.id,
          roomInfo.cover.urls[0]
        )
      },

      // 直播状态
      statechange({ detail }) {
        // console.log('detail', detail);
      },

      // 网络状况
      onNetStatus({ detail }) {
        // console.log('onNetStatus detail', detail);
      }
    }
  })
)

/**
 * 计算坐标值的角度
 *
 * @param {object} start
 * @param {object} end
 * @returns {Number}
 */

function getAngle(start, end) {
  const _X = end.X - start.X
  const _Y = end.Y - start.Y

  //返回角度 /Math.atan()返回数字的反正切值
  return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
}

/**
 * 两个数组去重复
 *
 * @param {Array} list1
 * @param {Array} list2
 * @returns {Array} list1
 * @returns {Array} list2
 */

function deduplicate(list1, list2) {
  let map = {}
  let templist1 = [...list1]
  let templist2 = [...list2]
  let index = 0

  templist1.forEach(item => (map[item.id] = true))

  while (index < templist2.length) {
    // 删除 map 表中相同项
    if (map[templist2[index].id]) {
      delete map[templist2[index].id]
      templist2.splice(index, 1)
    } else {
      index++
    }
  }

  index = 0

  while (index < templist1.length) {
    // 回溯 list1
    if (!map[templist1[index].id]) {
      templist1.splice(index, 1)
    } else {
      index++
    }
  }

  return {
    list1: [...templist1],
    list2: [...templist2]
  }
}
