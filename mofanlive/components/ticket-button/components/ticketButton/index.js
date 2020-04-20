Component({
  properties: {
    count: {
      type: Number,
      value: 0
    },

    expire: {
      type: String,
      value: 0,
      optionalTypes: [String, Number]
    }
  },

  observers: {
    expire(timestamp) {
      // this.setData({ expireText: moment(Number(timestamp)).fromNow() })
      this.setData({ expireText: timestamp })
    }
  },

  data: {
    expireText: "",
    showMoreTicket: false,
    showShareImage: false,
    shareImage: "https://mofanshow-avatar-1252461817.cos.ap-guangzhou.myqcloud.com/5f46e1c5-cf08-dd38-b7dd-bd666c5089bd.png"
  },

  methods: {
    closeMoreTicket() {
      this.setData({ showMoreTicket: false })
    },

    tuneUpMoreTicket() {
      this.setData({ showMoreTicket: true })
    },

    onShareImage() {
      this.setData({ showShareImage: true })
    },

    closeShareImage() {
      this.setData({ showShareImage: false })
    }
  }
})
