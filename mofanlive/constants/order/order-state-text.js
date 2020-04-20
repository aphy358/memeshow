import OAK from './order-actions-key'


/**
 * 订单状态文案显示
 */
const OrderStateText = {

  // 待付款
  [OAK.WaitPay]: {
    Title: '等待买家付款',
    Class: 'red'
  },

  // 待发货
  [OAK.WaitDelivery]: {
    Title: '买家已付款',
    Class: 'red'
  },

  // 待收货
  [OAK.WaitReceive]: {
    Title: '商家已发货',
    Class: 'red'
  },

  // 交易完成
  [OAK.Complete]: {
    Title: '交易完成',
    Class: 'red'
  },

  // 交易关闭
  [OAK.Close]: {
    Title: '交易关闭',
    Class: 'gray'
  },
}

export default OrderStateText