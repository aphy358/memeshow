import { RSK } from '@/constants/merchant-refund'
import { timeCountDown } from '@/utils/util'

Component({

  options: {
    // 表示该组件样式将影响到自定义组件
    styleIsolation: 'shared'
  },

  properties: {
    refundDetail: {
      type: Object,
      value: {},
    }
  },

  data: {
    RSK,
  },
})