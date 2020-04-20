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
      Title: RAT.RejectApply,
      Class: OAC.Tertiary
    }, {
      Title: RAT.ApproveApply,
      Class: OAC.Secondary
    }],

    // 已拒绝
    [RSK.Rejected]: [{
      Title: RAT.NegotiationAgree,
      Class: OAC.Secondary
    }],

    // 待退货
    [RSK.Confirmed]: [],

    // 退货中
    [RSK.Returning]: [{
      Title: RAT.RejectReturn,
      Class: OAC.Tertiary
    }, {
      Title: RAT.ConfirmReturned,
      Class: OAC.Secondary
    }],

    // 退货拒绝
    [RSK.ReturnRejected]: [{
      Title: RAT.NegotiationAgree,
      Class: OAC.Secondary
    }],

    // 待退款
    [RSK.Returned]: [],

    // 退款中
    [RSK.Refunding]: [],

    // 完成
    [RSK.Complete]: [],
    
    // 关闭
    [RSK.Closed]: [],
    
  },

  // 退款
  "2": {

    // 待审核
    [RSK.Unconfirmed]: [{
      Title: RAT.RejectApply,
      Class: OAC.Tertiary
    }, {
      Title: RAT.ApproveApply,
      Class: OAC.Secondary
    }],

    // 已拒绝
    [RSK.Rejected]: [{
      Title: RAT.NegotiationAgree,
      Class: OAC.Secondary
    }],

    // 待退款
    [RSK.Confirmed]: [],

    // 退款中
    [RSK.Refunding]: [],

    // 完成
    [RSK.Complete]: [],
    
    // 关闭
    [RSK.Closed]: [],
  },
}

export default RefundDetailActions
