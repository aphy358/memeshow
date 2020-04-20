import { safeArea } from "ui-kit/behaviors"

Component({
  behaviors: [safeArea()],

  properties: {
    open: {
      type: Boolean,
      value: false,
    },

    /**
     * 筛选条件
     * [{
     *     id,
     *     k,
     *     values: [
     *       {
     *         id, v
     *       },
     *     ]
     * },]
     */
    filters: {
      type: Object,
      value: [],
      observer: 'init',
    }
  },

  data: {
    selected: {}
  },

  methods: {
    init(filters) {
      if (!filters || filters.length < 1) return;
      const selected = {}
      for (let i = 0; i < filters.length; i++) {
        selected[filters[i].id] = "all"
      }
      this.setData({
        selected
      })
    },

    tapItem(e) {
      const { kid, vid } = e.currentTarget.dataset
      const { selected } = this.data
      selected[kid] = vid
      this.setData({ selected })
    },

    reset() {
      this.init(this.data.filters)
    },

    confirm() {
      const { selected } = this.data
      this.triggerEvent("change", selected)
    }
  },

  options: {
    addGlobalClass: true
  }
})