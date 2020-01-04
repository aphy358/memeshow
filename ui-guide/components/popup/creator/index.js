function FrameProp(key, listeners = {}) {
  this.key = key
  this.listeners = listeners

  // frame 的数据结构
  // const frameData = {
  //   caller: {
  //     channel: null,
  //     waitEmit: {},
  //     waitOn: {},
  //     wiatOnce: {}
  //   },

  //   procedure: {
  //     channel: null,
  //     waitEmit: {},
  //     waitOn: {},
  //     wiatOnce: {}
  //   }
  // }
}

export default FrameProp
