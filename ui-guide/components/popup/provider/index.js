import FrameProp from "../creator"
import Procedures from "procedures"

Component({
  properties: {
    frame: {
      type: String,
      value: ""
    },

    // 是否有朦层 todo
    mask: {
      type: Boolean,
      value: true
    },

    trigger: {
      type: Object,
      value: {}
    }
  },

  relations: {
    "../frame/index": {
      type: "child",
    }
  },

  observers: {
    frame(key) {
      if (!key) return
      this._procedures.open({
        type: "popup",
        target: key
      })
    }
  },

  lifetimes: {
    attached() {
      this._procedures = new Procedures()
      this._procedures.register(this)
    },

    detached() {
      this._procedures.unRegister(this)
    }
  }
})
