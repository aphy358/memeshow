import _ from 'lodash'

Component({
  properties: {
    list: {
      type: Object,
      value: []
    },
  },

  data: {
    checkedTrade: []
  },

  methods: {
    checkAll(checked) {
      const children = []
      this.data.list.forEach(it => {
        children.push(this.selectComponent(`#${it.shop.id}`))
      })
      children.forEach(it => {
        it.checkTradeAll({ detail: { checked } })
      })
    },
    checkWholeTrade(e) {
      const { state, id } = e.detail
      const c = this.data.checkedTrade
      const index = _.findIndex(c, it => it === id)
      console.log(state, index, id, c)
      if (state && index === -1) {
        c.push(id)
      } else if (!state && index != -1) {
        c.splice(index, 1)
      }
      console.log(c.length, this.data.list.length)

      this.triggerEvent('checkall', {
        state: c.length === this.data.list.length
      })
    },
  },
})