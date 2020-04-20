/**
 * RefundStateKey - 售后单状态键值
 */
const RSK= {

  // 买家提交申请,等待卖家审核
  Unconfirmed: 'unconfirmed',

  // 卖家拒绝申请,买家可重新编辑再次提交或关闭申请
  Rejected: 'rejected',

  // 卖家同意申请,等待买家发货或者直接退款
  Confirmed: 'confirmed',

  // 退货中,等待卖家签收或拒签
  Returning: 'returning',

  // 已退货,卖家已签收
  Returned: 'returned',

  // 卖家拒收,关闭退款单（据说以后也不会出现在前端）
  ReturnRejected: 'return_rejected',

  // 退款中,等待银行将退款打给买家
  Refunding: 'refunding',

  // 据说这种状态前端不会出现
  Refunded: 'refunded',

  // 完成
  Complete: 'complete',

  // 关闭
  Closed: 'closed',
}

export default RSK
