import RSK from './refund-state-key'
import RAT from './refund-actions-text'
import RefundStateText, { RST } from './refund-state-text'
import RefundListActions from './refund-list-actions'
import RefundDetailActions from './refund-detail-actions'
import RefundTypeText from './refund-type-text'
import RefundTabs from './refund-tabs'
import RefundDetailRefundText from './refund-detail-refund-text'


/**
 * 汇集了所有退款/售后单的 mapping
 */
export {

  // 售后单操作按钮文案
  RAT,

  // 售后单状态键值
  RSK,

  // 售后单状态文案
  RST,

  // 售后单状态文案
  RefundStateText,

  // 售后单列表 - 售后单单对应的操作按钮
  RefundListActions,

  // 售后单详情 - 售后单单对应的操作按钮
  RefundDetailActions,

  // 退款方式文案
  RefundTypeText,

  // 售后单列表分类
  RefundTabs,

  // 售后单详情 - 售后按钮文案
  RefundDetailRefundText,
}