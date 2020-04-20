import { connectPage } from "wx-redux"
import { chooseImage, uploadImage } from '@/utils/cos'
import _ from 'lodash'
const Api = wx.X.Api
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = state => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  data: {
    cover: "",
    title: "",

    bg: "https://cos.ap-guangzhou.myqcloud.com/mofanshow-avatar-1252461817/wx8fba36125c622563.o6zAJs2-ytkTcFWlildF1ZHipNKY.oazkujs01Axqfe6c31be4db83283e7d4fcb15489026c.jpg",
    defaultCover: "",
  },


  onInputTitle(e) {
    const { detail } = e
    this.setData({
      title: detail.value
    })
  },

  async selectImage() {
    const filePath = await chooseImage({
      sizeType: ["original"],
    })
    const url = await uploadImage(filePath)
    const imgSize = "?imageView2/1/w/300/h/300"
    this.setData({
      cover: url + imgSize
    })

    //todo 选好图片后，跳转到裁剪页面进行裁剪
  },

  async confirm() {
    if (!this.canCreateLive()) {
      return
    }

    const { title, cover } = this.data
    this.createLive(title, cover)
  },

  canCreateLive() {
    const { cover, title } = this.data
    if (!title) {
      wx.showToast({
        title: "请填写标题",
        icon: "none"
      })
      return false
    }
    if (!cover) {
      wx.showToast({
        title: "请选择封面图",
        icon: "none"
      })
      return false
    }
    return true
  },

  oneClickCreateLive() {
    const name = ""
    const title = name + "的店喊你来看直播专场"
    const cover = this.data.defaultCover
    this.createLive(title, cover)
  },

  async createLive(title, url) {
    wx.showLoading()
    await this.destroyAllRoom()

    const requestBody = {
      title,
      cover: {
        isAnimated: false,
        type: 0,
        width: 150,
        height: 150,
        urls: [url],
        avgColor: '',
      },
      location: {},
    }
    this.data.roomInfo = await wx.X.Api.Live.createRoom(requestBody)
    wx.hideLoading()

    router.redirect("livePusher", { roomId: this.data.roomInfo.id})
  },

  /**
   * 测试时用，把之前创建的房间全删掉，因为指标有限
   */
  async destroyAllRoom() {
    const roomList = await Api.Live.list({ type: 'all' })

    // 当前已经存在的直播间如果超过了10，则清空
    // for (let i = 0; i < roomList.length; i++) {
    //   const room = roomList[i]
    //   await Api.Live.destroyRoom(room.id)
    // }

    await Api.Live.destroyRoomForce()
  },


  options: {
    addGlobalClass: true
  }
}))