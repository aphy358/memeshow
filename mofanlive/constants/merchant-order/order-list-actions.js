import OAT from './order-actions-text'
import OAC from './order-actions-class'
import OAK from './order-actions-key'


/**
 * 订单列表 - 订单对应的操作按钮
 */
const OrderListActions = {

  // 待付款
  [OAK.WaitPay]: [{
    Title: OAT.AmendPrice,
    Class: OAC.Tertiary
  }, {
    Title: OAT.Close,
    Class: OAC.Tertiary
  }, {
    Title: OAT.Remark,
    Class: OAC.Tertiary
  }],

  // 待发货
  [OAK.WaitDelivery]: [{
    Title: OAT.Remark,
    Class: OAC.Tertiary
  }, {
    Title: OAT.Delivery,
    Class: OAC.Secondary
  }],

  // 待收货
  [OAK.WaitReceive]: [{
    Title: OAT.Remark,
    Class: OAC.Tertiary
  }, {
    Title: OAT.CheckLogistics,
    Class: OAC.Tertiary
  }],

  // 交易完成
  [OAK.Complete]: [{
    Title: OAT.Remark,
    Class: OAC.Tertiary
  }],

  // 交易关闭
  [OAK.Close]: [{
    Title: OAT.Remark,
    Class: OAC.Tertiary
  }],
}

export default OrderListActions