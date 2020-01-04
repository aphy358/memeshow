import EventBus from "EventBus"

export default class Procedures {
  constructor() {
    this.uid = new Date().getTime()
    this.bus = new EventBus()
    this.process = []

    Object.defineProperty(this, "active", {
      get() {
        const { process } = this
        const length = process.length
        if (length) return process[length - 1]
        else return null
      },

      set(instance) {
        this.process.push(instance)
      },

      configurable: true,
      enumerable: true
    })
  }

  // 将 instance 加入到 process 流程中
  register(instance, events = {}) {
    if (!instance || typeof instance !== "object")
      throw new Error("<Procedures>.register 要求一个页面或组件的实例作为参数!")

    this.active = instance

    if (Object.keys(events).length > 0) {
      this.bus.register({
        instance,
        events
      })
    }
  }

  // 注销当前 instance
  unRegister(instance) {
    if (Object.is(instance, this.active)) {
      this.process.pop()
    }
  }

  // 获取通信通道
  getChannel(instance) {
    return (function(self) {
      return {
        target: self.process[self.process.length - 2],

        emit(event, data) {
          // 如果 emit 的调用者不是 active，静默失败
          if (instance !== self.active) return

          self.bus.postToTarget(this.target, "on", event, data)
        }
      }
    })(this)
  }

  open({ target, type = "page" }) {
    if (!target) throw new Error("open 必须传入目标参数!")

    const adapter = this.getAdapter(type)
    adapter.generate(target)
  }

  getAdapter(type) {
    // todo adapter
    if (type == "page") {
      return {
        generate(target) {
          wx.navigateTo({
            url: `/pages/procedures/${target}/index`,
            fail: err => rejected(err)
          })
        }
      }
    } else if (type == "popup") {
      const provider = this.process[0]
      return {
        generate(target) {
          const frames = provider.getRelationNodes("../frame/index")
          for (let i = 0; i < frames.length; i++) {
            if (frames[i].data.key && frames[i].data.key === target) {
              frames[i].open()
              break
            }
          }
        }
      }
    }
  }
}
