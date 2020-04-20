var e = (0, require("../../utils/systemInfo").getSystemInfoSync)() || {},
  i = e.system || "",
  s = e.statusBarHeight || 24,
  a = i.indexOf("iOS") > -1 ? 44 : 48,
  r = s + a

Component({
  options: {
    multipleSlots: !0
  },
  externalClasses: ["navigation-class"],
  properties: {
    bgColor: {
      type: String,
      value: "#fff"
    },
    title: {
      type: String,
      value: ""
    },
    attatchSlotHeight: {
      type: Number,
      value: 0
    },
    fontColor: {
      type: String,
      value: "#000"
    }
  },
  observers: {
    attatchSlotHeight: function(t) {
      this.setData({
        titleHeight: r + t
      })
    }
  },
  data: {
    // show: (0, t.compareVersion)(e.version, "7.0.0") >= 0,
    show: true,
    statusBarHeight: s,
    titleBarHeight: a,
    navBarHeight: r,
    titleHeight: r
  }
})
