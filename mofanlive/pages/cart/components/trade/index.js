Component({
  properties: {
    trade: {
      type: Object,
      value: {}
    }
  },

  data: {
    skuCheckState: {},
    checkAll: false,
    actions: [
      {
        title: '删除',
        color: "#ff4949",
      }
    ]
  },

  methods: {
    changeQuantity(e) {
      console.log(e)
      this.triggerEvent('quantity', e.detail)
    },
    checkTradeAll(e) {
      const state = e.detail.checked
      const skuCheckState = this.data.skuCheckState
      for (let k in skuCheckState) {
        skuCheckState[k] = state
      }
      this.setData({
        skuCheckState,
        checkAll: state
      })
      this.emitAll(state)
    },
    checkSku(e) {
      const index = e.currentTarget.dataset.index
      const list = this.data.trade.list
      this.setData({
        [`skuCheckState.${list[index].skuId}`]: e.detail.checked,
      }, () => {
        const state = _.reduce(this.data.skuCheckState, (res, it) => res && it, true)
        this.setData({
          checkAll: state
        })
        this.emitAll(state)
      })
    },
    emitAll(state) {
      this.triggerEvent('checktrade', {
        id: this.data.trade.shop.id,
        state
      })
    }
  },

  observers: {
    trade(t) {
      console.log(t)
      const skuCheckState = this.data.skuCheckState
      _.forEach(t.list, it => {
        if (!(it.skuId in skuCheckState)) {
          skuCheckState[it.skuId] = false
        }
      })
      this.setData({
        skuCheckState
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})