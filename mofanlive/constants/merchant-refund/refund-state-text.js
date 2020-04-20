import RSK from './refund-state-key'


export const RST = {

  SellerProcessing: '商家处理中',

  BuyerProcessing: '买家处理中',

  CSProcessing: '客服处理中',

  Complete: '退款成功',

  Closed: '申请已撤销'
}


/**
 * 售后单状态文案
 */
const RefundStateText = { 

  /**
   * 退款退货
   */
  "1": {

    // 待审核
    [RSK.Unconfirmed]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 退货中
    [RSK.Returning]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 退款中
    [RSK.Refunding]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 待退款
    [RSK.Returned]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 拒收
    [RSK.ReturnRejected]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 待退款
    [RSK.Refunded]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 已拒绝
    [RSK.Rejected]: {
      Title: RST.BuyerProcessing,
      Class: 'red'
    },

    // 待退货/待退款
    [RSK.Confirmed]: {
      Title: RST.BuyerProcessing,
      Class: 'red'
    },

    // 关闭
    [RSK.Closed]: {
      Title: RST.Closed,
      Class: 'gray'
    },
    
    // 完成
    [RSK.Complete]: {
      Title: RST.Complete,
      Class: 'red'
    },
    
  },

  /**
   * 退款
   */
  "2": {

    // 待审核
    [RSK.Unconfirmed]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 待退货/待退款
    [RSK.Confirmed]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 退款中
    [RSK.Refunding]: {
      Title: RST.SellerProcessing,
      Class: 'red'
    },

    // 已拒绝
    [RSK.Rejected]: {
      Title: RST.BuyerProcessing,
      Class: 'red'
    },

    // 关闭
    [RSK.Closed]: {
      Title: RST.Closed,
      Class: 'gray'
    },
    
    // 完成
    [RSK.Complete]: {
      Title: RST.Complete,
      Class: 'red'
    },

  },
}

export default RefundStateText
