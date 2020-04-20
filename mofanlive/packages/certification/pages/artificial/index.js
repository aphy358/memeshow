import common from "../../utils"
import { connectPage } from "wx-redux"


const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  data: {
    currentType: 1,

    // 公司企业是否选中
    radioOneChecked: true,

    // 个体工商户是否选中
    radioTwoChecked: false,
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

      this.setData({ currentType: key })
    }
  },

  /**
   * 切换企业类型
   */
  setCorpType({ detail }) {
    const { value, checked } = detail

    if (value === 1) {
      this.setData({ radioTwoChecked: !checked })
    } else {
      this.setData({ radioOneChecked: !checked })
    }
  },

  uploadedLicense({ detail }) {

  },

  uploadedFront({ detail }) {

  },

  uploadedReverse({ detail }) {

  },

  uploadedInHand({ detail }) {

  },
}))