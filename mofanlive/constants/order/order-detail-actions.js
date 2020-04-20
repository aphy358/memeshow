import OAT from './order-actions-text'
import OAC from './order-actions-class'
import OAK from './order-actions-key'


/**
 * 订单详情 - 订单对应的操作按钮
 */
const OrderDetailActions = {

  // 待付款
  [OAK.WaitPay]: [{
    Title: OAT.GoToPay,
    Class: OAC.Primary
  }],

  // 待发货
  [OAK.WaitDelivery]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }],

  // 待收货
  [OAK.WaitReceive]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }, {
    Title: OAT.Receive,
    Class: OAC.Secondary
  }],

  // 交易完成
  [OAK.Complete]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }],

  // 交易关闭
  [OAK.Close]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }],
}

export default OrderDetailActions