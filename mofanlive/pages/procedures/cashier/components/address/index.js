const procedures = wx.X.procedures

Component({
  properties: {
    address: {
      type: Object,
      value: {},
    }
  },

  data: {
    addr: {}
  },

  methods: {
    addAddress() {
      const onComplete = (data) => {
        console.log(data)
      }
      const onError = (err) => {
        console.error(err)
      }
      const instance = procedures.open("add-address", null, onComplete, onError)
    },

    selectAddress() {
      const onComplete = (data) => {
        console.log(data)
      }
      const onError = (err) => {
        console.error(err)
      }
      const instance = procedures.open("select-address", null, onComplete, onError)
    }
  },

  /**
   * 当地址改变 抛出改变的消息
   * @param {Object} data 
   */
  emitChange(data) {
    // TODO
    this.triggerEvent("")
  },

  observers: {
    "address": function (addr) {
      this.setData({ addr })
    }
  },

  options: {
    addGlobalClass: true,
  },
})