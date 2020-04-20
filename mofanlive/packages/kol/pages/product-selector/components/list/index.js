Component({
  properties: {
    list: {
      type: Object,
      value: null
    },

    // 默认选中的商品id列表
    default: {
      type: Object,
      value: [],
      observer: 'observerDefault'
    }
  },

  data: {
    selected: {}
  },

  methods: {
    observerDefault(list) {
      if (list.length < 1) {
        this.setData({ selected: {} })
        return
      }
      const selected = {}
      for (let i = 0; i < list.length; i++) {
        selected[list[i]] = true
      }
      this.setData({ selected })
    },

    onItemChecked({ detail: { id, checked } }) {
      const { selected } = this.data
      selected[id] = checked
      if (!checked) {
        delete selected[id]
      }
      this.setData({ selected })

      this.triggerEvent("change", {
        "selected": Object.keys(selected)
      })
    }
  },

  options: {
    addGlobalClass: true
  }
})