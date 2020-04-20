import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 是否显示popup
    show: {
      type: Boolean,
      value: false
    },

    shopInfo: {
      type: Object,
      value: {}
    },
  },

  data: {
  },

  methods: {
    hidePopup() {
      this.triggerEvent('hideContactSellerPopup')
    },

    /**
     * 复制微信号
     */
    copyWechatNo() {
      const { wechat } = this.data.shopInfo

      wx.setClipboardData({
        data: wechat,
        success (res) {
          wx.showToast({
            title: '复制成功',
            icon: 'success',
            duration: 2000
          })
        }
      })

      this.hidePopup()
    }
   },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))