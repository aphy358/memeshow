
/**
 * 订单 tab 分类（tab）
 */
const OrderTabs = {

  // 全部
  All: {
    Title: '全部',
    Key: 'all',
  },

  // 待付款
  Unpaid: {
    Title: '待付款',
    Key: 'unpaid',
  },

  // 待发货
  Undeliver: {
    Title: '待发货',
    Key: 'undelivered',
  },

  // 待收货
  Delivering: {
    Title: '待收货',
    Key: 'delivering',
  },

  // 售后，注意，售后单据和其他单据不是同一类型的单据，需调用不同接口
  // Refund: {
  //   Title: '售后',
  //   Key: 'refund',
  // },
}

export default OrderTabs