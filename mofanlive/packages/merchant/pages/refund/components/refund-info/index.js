import { RefundTypeText } from '@/constants/merchant-refund'
const Api = wx.X.Api

Component({
  properties: {
    refundDetail: {
      type: Object,
      value: {},
      observer(newVal) {
        if (newVal && newVal.shop) {
          this.fetchShopInfo()
        }
      }
    }
  },

  data: {
    RefundTypeText,

    contactSellerPopupVisible: false,

    shopInfo: null,
  },

  methods: {
    emitRecords() {
      this.triggerEvent("records")
    },

    onHideContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: false })
    },

    showContactSellerPopup() {
      this.setData({ contactSellerPopupVisible: true })
    },

    async fetchShopInfo() {
      const { refundDetail: { shop } } = this.data
      const shopInfo = await Api.Shop.retrieve(shop.id)
      console.log('shopInfo', shopInfo);
      
      this.setData({ shopInfo })
    },

    makePhoneCall() {
      const { refundDetail: { shop } } = this.data
      wx.makePhoneCall({
        phoneNumber: shop.mobile || '15888529410'
      })
    }
  },

  options: {
    addGlobalClass: true
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
})