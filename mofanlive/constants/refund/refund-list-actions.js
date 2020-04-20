import RSK from './refund-state-key'
import OAT from '../order/order-actions-text'
import OAC from '../order/order-actions-class'


/**
 * 售后单列表 - 售后单对应的操作按钮
 */
const RefundListActions = {

  // 待审核
  [RSK.Unconfirmed]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 已拒绝
  [RSK.Rejected]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 待退货
  [RSK.Confirmed]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 退货中
  [RSK.Returning]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 待退款
  [RSK.Returned]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 拒收
  [RSK.ReturnRejected]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 退款中
  [RSK.Refunding]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 待退款
  [RSK.Refunded]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 完成
  [RSK.Complete]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],

  // 关闭
  [RSK.Closed]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Secondary
  }],
}

export default RefundListActions
