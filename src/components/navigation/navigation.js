import { connect } from '../../libs/redux/index.js'

const app = getApp()

console.log("this app", app)

let store = app.store

let componentConfig = {
  properties: {
    titleStyle: {
      type: String,
      value: ""
    },
    bgStyle: {
      type: String,
      value: ""
    },
    showLoading: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: "魔范秀"
    },
    height: {
      type: Number,
      value: app.globalData.titleBarHeight
    },
    textStyle: {
      type: String,
      value: "white",
      observer: "changeTextStyle"
    },
    delta: {
      type: Number,
      value: 1
    },
    showBackButton: {
      type: Boolean,
      value: true
    },
    custom: {
      type: Boolean,
      value: false
    }
  },
  data: {
    barHeight: app.globalData.statusBarHeight,
    navIconUrl: "/assets/images/backTo.png",
    navTitleStyle: "color: #999999;",
    navBgStyle: "background-color:#ffffff;"
  },
  attached: function () {
    getCurrentPages().length <= 1 && this.setData({
      showBackButton: false
    });
  },
  methods: {
    changeTextStyle: function () {
      if ("black" === this.data.textStyle) {
        wx.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#ffffff"
        })
        this.setData({
          navIconUrl: "/assets/images/backTo.png",
          navTitleStyle: "color: black;",
          navBgStyle: "background-color:#fff;"
        })
      } else {
        wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#101013"
        })
        this.setData({
          navIconUrl: "/assets/images/backTo.png",
          navTitleStyle: "color: white;",
          navBgStyle: "background-color:#101013;"
        })
      }
    },
    onBack: function () {
      this.triggerEvent("onBack", {})
      this.data.showBackButton && wx.navigateBack({
        delta: this.data.delta
      });
    }
  }
}

let mapStateToData = (state) => {
  return {
  }
}
const mapDispatchToPage = (dispatch) => ({
})
let connectedComponentConfig = connect(mapStateToData, mapDispatchToPage)(componentConfig, true)

Component(connectedComponentConfig)
