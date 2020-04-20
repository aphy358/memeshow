import OAT from './order-actions-text'
import OAK from './order-actions-key'

/**
 * 订单操作按钮
 */
const OrderActions = {

  // 支付
  [OAK.Pay]: OAT.GoToPay,

  // 取消
  [OAK.Close]: OAT.Close,

  // 确认收货
  [OAK.Receive]: OAT.Receive,

  // 申请退货
  [OAK.Return]: OAT.ApplyReturn,

  // 申请退款
  [OAK.Refund]: OAT.ApplyRefund,
}

export default OrderActions