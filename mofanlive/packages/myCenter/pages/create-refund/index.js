import { connectPage } from "wx-redux"
import { OAK } from '@/constants/order'
import computedBehavior from 'miniprogram-computed'
const Api = wx.X.Api

const mapStateToProps = state => ({ order: state.createRefund.order })
const mapDispatchToProps = dispatch => ({})

Page(connectPage(mapStateToProps, mapDispatchToProps)({

  behaviors: [computedBehavior],

  data: {
    
    OAK,

    type: {
      selected: "",
      value: -1,
      range: ['退款退货', '仅退款'],
    },

    reason: {
      selected: "",
      range: [
        "多买/买错/不想要",
        "快递无记录",
        "少货/空包裹",
        "未按约定时间发货",
        "快递一直未送到",
        "其他",
      ],
    },

    proof: [],

    receive: {
      range: ['未收到货', '已收到货'],
      selected: ''
    },

    sid: '',
  },

  watch: {
    order(newVal, oldVal) {
      if (!!newVal.id) {
        if (newVal.state === OAK.WaitDelivery) {
          this.setData({ "type.value": 2 })
        }
      }
    },
  },

  onLoad(options) {
  },

  onReady() {
  },

  onUnload() {
  },

  validateForm({
    reason,
    tel,
    itemState
  }) {

    if (!reason) {
      wx.showToast({
        title: "请输入申请退款原因",
        icon: "none"
      })
      return false
    }

    if (!tel) {
      wx.showToast({
        title: "请输入电话号码",
        icon: "none"
      })
      return false
    }

    if (!itemState) {
      wx.showToast({
        title: "请选择退款方式",
        icon: "none"
      })
      return false
    }

    return true
  },

  async handleSubmit({ detail }) {
    const { order, proof, reason, type } = this.data
    const { mobile, remark, receive } = detail.value

    // 创建售后单
    let params = {
      reason: reason.selected,
      remark: remark,
      tel: mobile,
      itemState: Number(receive || 0) + 1,
      enclosures: proof
    }

    if (!this.validateForm(params))  return false;

    // 如果选择了‘退货退款’，则不需要传 itemState，或者直接设置为收到货
    if (type.value != 2) {
      params.itemState = 2
    }

    if (!!order.thatRefundDetail) {
      // 这种情况说明是修改售后单，否则是创建售后单
      params.id = order.thatRefundDetail.id
      params.amount = order.thatItem.finalPrice
      await Api.Refund.reapply(params)

    } else {
      params.orderId = order.id
      params.type = type.value
      params.items = [{
        orderItemId: order.thatItem.id,
        amount: order.thatItem.finalPrice,
      }]
      await Api.Refund.create(params)
    }

    wx.navigateBack({
      delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
    });
  },

  handleTypeChange({ detail }) {
    this.setData({
      "type.selected": this.data.type.range[detail.value],
      "type.value": Number(detail.value) + 1,
    })
  },

  handleReasonChange(e) {
    this.setData({
      "reason.selected": this.data.reason.range[e.detail.value]
    })
  },

  handleReceiveChange(e) {
    this.setData({
      "receive.selected": this.data.receive.range[e.detail.value]
    })
  },

  handleProofChange({ detail }) {
    this.data.proof = detail
  }
}))