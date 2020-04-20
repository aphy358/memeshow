import './assets/no-record-1.png'
import './assets/no-record-2.png'
import './assets/no-record-3.png'
import './assets/no-record-4.png'
import './assets/no-record-5.png'

Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 类型 - 1：商品、2：订单、3：收藏、4：地址
    type: {
      type: Number,
      value: 1,
      observer(type) {
        if (type == 4) {
          this.setData({ imgWidth: 148 })
        }
      }
    },
  },

  data: {
    // 无数据文案
    defaultText: {
      1: '暂无商品',
      2: '暂无订单',
      3: '暂无收藏',
      4: '还没有收货地址，快去添加一个吧~',
      5: '无需物流，暂无记录',
    },

    imgWidth: 320,
  },
})