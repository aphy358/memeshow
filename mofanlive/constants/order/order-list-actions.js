import OAT from './order-actions-text'
import OAC from './order-actions-class'
import OAK from './order-actions-key'


/**
 * 订单列表 - 订单对应的操作按钮
 */
const OrderListActions = {

  // 待付款
  [OAK.WaitPay]: [{
    Title: OAT.Close,
    Class: OAC.Tertiary
  }, {
    Title: OAT.Pay,
    Class: OAC.Secondary
  }],

  // 待发货
  [OAK.WaitDelivery]: [{
    Title: OAT.RemindDelivery,
    Class: OAC.Tertiary
  }, {
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }],

  // 待收货 - 再来一单 查看物流 确认收货
  [OAK.WaitReceive]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }, {
    Title: OAT.CheckLogistics,
    Class: OAC.Tertiary
  }, {
    Title: OAT.Receive,
    Class: OAC.Secondary
  }],

  // 交易完成
  [OAK.Complete]: [{
    Title: OAT.CheckLogistics,
    Class: OAC.Tertiary
  }, {
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }],

  // 交易关闭
  [OAK.Close]: [{
    Title: OAT.BuyAgain,
    Class: OAC.Tertiary
  }],
}

export default OrderListActions