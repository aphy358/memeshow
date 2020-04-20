import { connectComponent } from "wx-redux"
import { menuBtn } from "ui-kit/behaviors/index"
const router = wx.X.router

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  behaviors: [menuBtn()],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 直播间信息
    roomInfo: {
      type: Object,
      value: null,
      observer: 'onRoomInfo'
    },
  },

  data: {

  },

  methods: {
    // 点击 ‘关注’
    followAnchor() {
      wx.requestSubscribeMessage({
        tmplIds: ['78'],
        success (res) {},
        fail (err) {
        },
      })

      this.triggerEvent('showFollow')
    },
    switchToShop() {
      router.go("shop")
    }
  }
}))
