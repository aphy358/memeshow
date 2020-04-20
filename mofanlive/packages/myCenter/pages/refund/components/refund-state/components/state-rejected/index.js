import { connectComponent } from "wx-redux"
import { timeCountDown } from '@/utils/util'


const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    refundDetail: {
      type: Object,
      value: {},
      observer(newVal) {
        if (!!newVal.id) {
          this.setData({ countDown: timeCountDown(newVal.rejectedCloseExpireAt) })

          setInterval(() => {
            this.setData({ countDown: timeCountDown(newVal.rejectedCloseExpireAt) })
          }, 1000);
        }
      }
    }
  },

  data: {
    // 1582348582213
    countDown: ''
  },

  methods: {
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))