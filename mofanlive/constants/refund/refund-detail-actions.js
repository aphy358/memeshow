import RSK from './refund-state-key'
import RAT from './refund-actions-text'
import OAC from '../order/order-actions-class'


/**
 * 售后单详情 - 售后单对应的操作按钮
 */
const RefundDetailActions = {

  // 退款退货
  "1": {

    // 待审核
    [RSK.Unconfirmed]: [{
      Title: RAT.CancelRefund,
      Class: OAC.Secondary
    }],

    // 已拒绝
    [RSK.Rejected]: [{
      Title: RAT.ApplyCustomService,
      Class: OAC.Tertiary
    }, {
      Title: RAT.CancelRefund,
      Class: OAC.Tertiary
    }, {
      Title: RAT.AmendRefund,
      Class: OAC.Secondary
    }],

    // 待退货
    [RSK.Confirmed]: [{
      Title: RAT.FillInLogistics,
      Class: OAC.Tertiary
    }, {
      Title: RAT.CancelRefund,
      Class: OAC.Secondary
    }],

    // 退货中
    [RSK.Returning]: [{
      Title: RAT.CancelRefund,
      Class: OAC.Secondary
    }],

    // 退货拒绝
    [RSK.ReturnRejected]: [{
      Title: RAT.ApplyCustomService,
      Class: OAC.Tertiary
    }, {
      Title: RAT.CancelRefund,
      Class: OAC.Tertiary
    }, {
      Title: RAT.AmendRefund,
      Class: OAC.Secondary
    }],

    // 待退款
    [RSK.Returned]: [],

    // 退款中
    [RSK.Refunding]: [],

    // 完成
    [RSK.Complete]: [],
    
    // 关闭
    [RSK.Closed]: [{
      Title: RAT.RefundAgain,
      Class: OAC.Secondary
    }],
    
  },

  // 退款
  "2": {

    // 待审核
    [RSK.Unconfirmed]: [{
      Title: RAT.CancelRefund,
      Class: OAC.Secondary
    }],

    // 已拒绝
    [RSK.Rejected]: [{
      Title: RAT.ApplyCustomService,
      Class: OAC.Tertiary
    }, {
      Title: RAT.CancelRefund,
      Class: OAC.Tertiary
    }, {
      Title: RAT.AmendRefund,
      Class: OAC.Secondary
    }],

    // 待退款
    [RSK.Confirmed]: [],

    // 退款中
    [RSK.Refunding]: [],

    // 完成
    [RSK.Complete]: [],
    
    // 关闭
    [RSK.Closed]: [{
      Title: RAT.RefundAgain,
      Class: OAC.Secondary
    }],
  },
}

export default RefundDetailActions
