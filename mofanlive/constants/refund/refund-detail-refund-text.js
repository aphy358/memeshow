import RSK from './refund-state-key'

const RefundText = {
  ApplyRefund: '申请退款',
  Refunding: '正在退款',
  Refunded: '退款成功',
}


/**
 * 售后单详情 - 售后按钮文案
 */
const RefundDetailRefundText = {

  // 退款退货
  "1": {

    // 待审核
    [RSK.Unconfirmed]: RefundText.Refunding,

    // 已拒绝
    [RSK.Rejected]: RefundText.ApplyRefund,

    // 待退货
    [RSK.Confirmed]: RefundText.Refunding,

    // 退货中
    [RSK.Returning]: RefundText.Refunding,

    // 退货拒绝
    [RSK.ReturnRejected]: RefundText.ApplyRefund,

    // 待退款
    [RSK.Returned]: RefundText.Refunding,

    // 退款中
    [RSK.Refunding]: RefundText.Refunding,

    // 完成
    [RSK.Complete]: RefundText.Refunded,
    
    // 关闭
    [RSK.Closed]: RefundText.ApplyRefund,

    "": RefundText.ApplyRefund,
    
  },

  // 退款
  "2": {

    // 待审核
    [RSK.Unconfirmed]: RefundText.Refunding,

    // 已拒绝
    [RSK.Rejected]: RefundText.ApplyRefund,

    // 待退款
    [RSK.Confirmed]: RefundText.Refunding,

    // 退款中
    [RSK.Refunding]: RefundText.Refunding,

    // 完成
    [RSK.Complete]: RefundText.Refunded,
    
    // 关闭
    [RSK.Closed]: RefundText.ApplyRefund,

    "": RefundText.ApplyRefund,
  },
}

export default RefundDetailRefundText
