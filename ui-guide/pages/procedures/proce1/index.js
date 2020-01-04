const { globalProcedures: procedures } = getApp().globalData

Page({
  data: {
    text: "procedures page 1"
  },

  onLoad(options) {
    const channel = procedures.register(this, {
      on: {
        changeMyText(data) {
          console.log("callback has been invoke")
          this.setData({ text: data.text })
        }
      }
    })
  },

  onOpen() {
    procedures.open({
      type: "page",
      target: "proce2"
    })
  },

  onUnload() {
    procedures.unRegister(this)
  }
})
