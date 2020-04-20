import OAK from './order-actions-key'


/**
 * 订单状态文案显示
 */
const OrderStateText = {

  // 待付款
  [OAK.WaitPay]: {
    Title: '待付款',
    Class: 'red'
  },

  // 待发货
  [OAK.WaitDelivery]: {
    Title: '待发货',
    Class: 'red'
  },

  // 待收货
  [OAK.WaitReceive]: {
    Title: '待收货',
    Class: 'red'
  },

  // 交易完成
  [OAK.Complete]: {
    Title: '已完成',
    Class: 'red'
  },

  // 交易关闭
  [OAK.Close]: {
    Title: '已关闭',
    Class: 'gray'
  },
}

export default OrderStateText