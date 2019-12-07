Component({
  externalClasses: ['scroll-view-x-class', 'active-class', 'scroll-view-wrap-class'],
  data: {
    tList: ["tab1", "tab2", "tab3"]
  },
  properties: {
    tList: {
      type: Array,
      value: []
    }, //标题列表
    currentTab: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        this.setData({
          currentTab: newVal
        })
      }
    },
    tname: {
      type: String,
      value: ''
    },
    ttype: {
      type: Number,
      value: ''
    }
  },
  ready() {
    console.log(this.data);
  },
  methods: {
    _swichNav: function (e) {
      console.log("e", e)
      this.triggerEvent('changeCurrent', {
        currentNum: e.currentTarget.dataset.current
      })
    }
  }
})