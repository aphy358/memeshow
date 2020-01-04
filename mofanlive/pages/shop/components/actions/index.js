import _ from 'lodash'

Component({
  properties: {

  },

  data: {
    entering: false,
    keyword: "",
    hasChanged: false,
    current: 'popular',
    price: {
      state: 3, // none asc desc
      states: ['asc', 'desc', 'none']
    },
    cls: {
      title: '分类',
      key: '',
      open: false,
      padHeight: 0,
      list: [
        {
          title: '全部',
          key: ''
        },
        {
          title: '女装',
          key: 'woman'
        },
        {
          title: '男装',
          key: 'man'
        },
        {
          title: '工装',
          key: 'work'
        },
        {
          title: '鞋',
          key: 'shoes'
        },
        {
          title: '帽子',
          key: 'hat'
        },
        {
          title: '节日帽子',
          key: 'hhat'
        },
      ]
    }
  },

  methods: {
    enter(e) {
      const keyword = e.detail.value
      this.setData({
        keyword,
        hasChanged: true
      })
      this.emitChange()
    },

    emitChange: _.debounce(function () {
      this.triggerEvent('change')
      // todo emit condition
    }, 500),

    closeInput() {
      this.setData({
        entering: false,
        hasChanged: false,
      })
    },

    openInput() {
      this.setData({
        entering: true
      })
    },

    selectCondition(e) {
      const key = e.currentTarget.dataset.key
      switch (key) {
        case 'cls': {
          this.toggleCls()
          break
        }
        case 'price': {
          this.setData({
            current: key,
            "price.state": ++this.data.price.state % 2
          }); break
        }
        default: {
          this.setData({
            current: key,
            "price.state": 2
          })
        }
      }
      this.emitChange()
    },

    toggleCls() {
      const open = this.data.cls.open
      if (!open) {
        this.createSelectorQuery()
          .selectAll('.cls-pad')
          .boundingClientRect()
          .exec(res => {
            const rect = res[0]
            const sys = wx.getSystemInfoSync()
            this.setData({
              "cls.padHeight": sys.screenHeight - rect[0].top
            })
          })
      }
      this.setData({
        "cls.open": !open
      })
    },

    clickCls(e) {
      const cls = this.data.cls
      const index = e.currentTarget.dataset.index
      const title = index === 0 ? '分类' : cls.list[index].title
      const key = cls.list[index].key
      this.setData({
        "cls.title": title,
        "cls.key": key,
      })
      this.toggleCls()
      this.emitChange()
    }
  },

  options: {
    addGlobalClass: true,
  }
})