import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

let timeBegin = 60
const timeFormat = (time) => {
  let min = Math.floor(time / 60)
  let sec = time % 60
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  return min + ':' + sec
}
Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
  },

  data: {
    timeCount: '01:00',
    visible: true
  },

  methods: {
  },

  ready() {
    this.data.timeInterval = setInterval(() => {
      if (timeBegin <= 0) {
        clearInterval(this.data.timeInterval)
        // this.setData({ visible: false })

      } else {
        timeBegin -= 1
        let timeCount = timeFormat(timeBegin)
        this.setData({ timeCount })
      }
    }, 1000);
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))