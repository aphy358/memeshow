import { connectPage } from "wx-redux"
import computedBehavior from 'miniprogram-computed'
const Api = wx.X.Api


const mapStateToProps = state => ({ 
  userProfile: state.userProfile,
  order: state.merchantOrders.thatOrder,
})
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    needLogistics: true,

    express: '',

    expressNo: '',

    selectedItems: [],
  },

  watch: {
    userProfile(newVal, oldVal) {
      if (newVal && newVal.id) {
      }
    },
  },

  onLoad: function ({ id }) {
    if (!!id) {
    }
  },

  onExpressChange({ detail }) {
    this.setData({
      express: detail,
    })
  },

  onSwitchExpressNecessary({ detail }) {
    this.setData({
      needLogistics: detail,
    })
  },

  onInputExpressNo({ detail }) {
    this.setData({
      expressNo: detail,
    })
  },

  onSelectChange({ detail }) {
    this.setData({
      selectedItems: detail.items,
    })
  },

  validateForm({ items, dist }) {

    if (items.length < 1) {
      wx.showToast({
        title: "请选择发货商品",
        icon: "none"
      })
      return false
    }

    if (dist) {
      const { express, expressNo } = dist
      
      if (!express) {
        wx.showToast({
          title: "请选择快递公司",
          icon: "none"
        })
        return false
      }

      if (!expressNo) {
        wx.showToast({
          title: "请输入快递单号",
          icon: "none"
        })
        return false
      }
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { order, selectedItems, express, expressNo, needLogistics } = this.data
    const items = selectedItems.filter(n => n.selected).map(n => n.id)

    const params = {
      orderId: order.id,
      items,
    }

    if (needLogistics) {  // 如果需要物流
      params.dist = {
        express,
        expressNo,
      }
    }

    if (!this.validateForm(params))  return false;

    await Api.MerchantOrder.checkinDelivery(params)

    wx.showToast({
      title: '订单已发货！',
      icon: 'none',
    });

    setTimeout(() => {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }, 500);
  },
 
}))