import EventBus from "EventBus"
import Procedures from "procedures"

const globalProcedures = new Procedures()
const globalEventBus = new EventBus()

App({
  globalData: {
    globalEventBus,
    globalProcedures
  }
})
