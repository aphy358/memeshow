var systemInfo = (0, require("../../utils/systemInfo").getSystemInfoSync)() || {},
  ios = (systemInfo.system || "").indexOf("iOS") > -1,
  statusHeight = systemInfo.statusBarHeight || 24,
  contentHeight = ios ? 44 : 48,
  titleHeight = statusHeight + contentHeight

Component({
  properties: {
    navBarOpacity: {
      type: Number,
      value: 0
    }
  },

  data: {
    menuButtonData: { height: 32 },
    statusBarHeight: statusHeight,
    titleBarHeight: contentHeight,
    navBarHeight: titleHeight,
    titleHeight: titleHeight,
    inputMargin: ios ? 4 : 8
  },
  methods: {
    handleTitleInput: function() {}
  }
})
