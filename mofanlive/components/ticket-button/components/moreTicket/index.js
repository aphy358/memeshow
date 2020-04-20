const Api = wx.X.Api
import "../../assets/wx.png"
import "../../assets/share.png"
import "../../assets/employeetag.png"

Component({
  properties: {
    count: Number,

    expire: {
      type: Number,
      value: 0,
      optionType: [Number, String]
    },

    ticketImg: {
      type: String,
      value: ""
    },
    isShow: {
      type: Boolean,
      value: !1
    },
    shareInfo: {
      type: String,
      value: ""
    }
  },

  data: {
    voucherHistory: [],
    hasMore: false,
    expireText: "",
    showSubMask: null,
    subScribeTitle: "提醒我回来领内购券"
  },

  observers: {
    expire(timestamp) {
      this.setData({ expireText: timestamp })
    },

    isShow(isShow) {
      if (isShow) {
        this.fetchVoucherHistory().then(res => {
          this.setData({
            voucherHistory: res.content,
            hasMore: res.content.length >= 30 && res.hasMore
          })
        }).catch(err => console.error(err))
      }
    }
  },

  methods: {
    async fetchVoucherHistory() {
      return await Api.Shop.voucherHistory()
    },

    closeMoreTicket() {
      this.triggerEvent("closemoreticket", {})
    },

    onShareImg() {
      this.triggerEvent("shareImage")
      //todo
    },

    inviteFriend() {
      // todo
    }
  }
})
