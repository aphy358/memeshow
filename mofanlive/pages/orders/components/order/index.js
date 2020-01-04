import { orderActions, orderStates } from '@/mapping'
import { formatTime } from '@/utils/util'
const timer = wx.X.timer

Component({
  properties: {
    order: {
      type: Object,
      value: {}
    },
  },

  data: {
    actionMap: orderActions,
    stateMap: orderStates,
    counter: 0,
  },

  methods: {
    navToShop() {
      // TODO shop

    },

    handleAction(e) {
      const action = e.currentTarget.dataset.action
      switch (action) {
        case 'pay': this.pay(); break;
      }
    },

    pay() {
      console.log('pay')
      console.log(this.data.stateMap[this.data.order.status])
    },

    navToOrderDetail() {
      wx.navigateTo({
        url: `/pages/order/index?id=${this.data.order.id}`
      })
    },
  },

  lifetimes: {
    ready() {
      const start = new Date()
      if (this.data.order.status === 0) {
        timer.register('orders', this.data.order.id, () => {
          // TODO
          const now = new Date()
          let count = start.getTime() - now.getTime() + 30 * 60 * 1000;
          count = Math.floor(count / 100)
          let mm = Math.floor(count / 600)
          mm = mm < 10 ? `0${mm}` : '' + mm
          let ss = Math.floor((count % 600) / 10)
          ss = ss < 10 ? `0${ss}` : '' + ss
          const counter = `${mm}:${ss}.${count % 10}`

          this.setData({
            counter
          })
        })
      }
    }
  },

  options: {
    addGlobalClass: true
  }
})