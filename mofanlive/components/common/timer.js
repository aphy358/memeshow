/**
 * {
 *   ['timer']: {intervalId, cbMap: {['id']: cd}}
 * }
 */
const timerMap = {}

const timer = {
  getTimer() {
    console.log(timerMap)
  },

  add(timer, timePiece) {
    this.clear(timer)
    timerMap[timer] = {}
    timerMap[timer].cbMap = {}
    timerMap[timer].intervalId = setInterval(this.exec(timer), timePiece)
  },

  register(timer, key, cb) {
    timerMap[timer].cbMap[key] = cb
  },

  unregister(timer, key) {
    delete timerMap[timer].cbMap[key]
  },

  exec(timer) {
    return () => {
      for (let key in timerMap[timer].cbMap) {
        timerMap[timer].cbMap[key]()
      }
    }
  },

  clear(timer) {
    if (timerMap[timer]) {
      if (timerMap[timer].intervalId) {
        clearInterval(timerMap[timer].intervalId)
      }
      delete timerMap[timer]
    }
  },
}

export default timer