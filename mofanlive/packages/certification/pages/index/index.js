import common from "../../utils"
import { connectPage } from "wx-redux"


const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    currentType: 1,
  },

  onLoad: function (options) {
  },

  onReady: function () {
  },

  onShow: function () {
  },

  /**
   * 切换订单类型
   */
  onTabChange({ detail }) {
    const { key } = detail
    const { currentType } = this.data

    if (key !== currentType) {
      // 将页面滚动到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    }
  },
 
}))