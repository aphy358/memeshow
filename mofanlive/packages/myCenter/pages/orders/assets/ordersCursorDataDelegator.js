const Api = wx.X.Api

/**
 * 订单游标管理
 */
class OrdersCursorDataDelegator {

  /**
   * 以订单的创建时间为游标
   * 
   * @param {Object} item 订单
   */
  cursor(item) {
    return item.ctime
  }

  async loadPrev(options) {
  }

  async loadNext(options) {
    const { type, cursor } = options
    return !!cursor
      ? await Api.Order.list({ type, cursor })
      : await Api.Order.list({ type })
  }
}

export default OrdersCursorDataDelegator
