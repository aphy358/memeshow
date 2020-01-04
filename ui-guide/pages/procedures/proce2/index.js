const { globalProcedures: procedures } = getApp().globalData

Page({
  data: {
    text: ""
  },

  onLoad(options) {
    procedures.register(this)
    this.channel = procedures.getChannel(this)
  },

  onUnload() {
    procedures.unRegister(this)
  },

  onInput({ detail }) {
    this.data.text = detail.value
  },

  sendMessage() {
    this.channel.emit("changeMyText", { text: this.data.text })
  }
})
