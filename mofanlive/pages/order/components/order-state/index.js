const timer = wx.X.timer

Component({
  properties: {
    state: {
      type: Number,
      value: -1
    },
    createTime: {
      type: Number,
      value: 0,
    }
  },

  data: {
    title: '',
    icon: '',
    timer: '',
    detail: '',
  },

  observers: {
    state(state) {
      if (state < 0) return;

      switch(state) {
        case 0: 
          // 未付款
          this.initUnpaidOrder(); break;
      }
    }
  },

  methods: {
    initUnpaidOrder() {
      timer.clear('order')
      timer.add('order', 1000)
      const start = new Date()
      this.setUnpaidDetail(start, start)
      timer.register('order', 'order', () => {
        const now = new Date()
        this.setUnpaidDetail(start, now)
      })
      this.setData({
        title: "订单未付款 等待买家支付",
        detail: "内付款，超时订单自动取消"
      })
    },
    setUnpaidDetail(start, end) {
      let count = start.getTime() - end.getTime() + 30 * 60 * 1000;
      count = Math.floor(count / 100)
      let mm = Math.floor(count / 600)
      mm = mm < 10 ? `0${mm}` : '' + mm
      let ss = Math.floor((count % 600) / 10)
      ss = ss < 10 ? `0${ss}` : '' + ss
      const timer = `${mm}分${ss}秒 `
      this.setData({
        timer
      })
    },
  },

  lifetimes: {
  },

  options: {
    addGlobalClass: true
  }
})
