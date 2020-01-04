import { connect } from "libs/redux/index.js"


let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'shared'
  },
  
  properties: {
    // 是否显示评论输入框
    show: {
      type: Boolean,
      value: false,
      observer: 'switchShow'
    },
  },

  data: {
    timer: 5,

    popClazz: ''
  },

  methods: {
    switchShow(newVal) {
      if (newVal) {
        this.setData({ popClazz: 'bounce-in' })

        setTimeout(() => {
          this.hidePop()
        }, 5000);

        setInterval(() => {
          let { timer } = this.data
          if (timer > 0) {
            this.setData({ timer: --timer })
          }
        }, 1000);
      }
    },

    hidePop(e) {
      this.setData({ popClazz: 'bounce-out' })
      this.triggerEvent('hide')
    }
  },

  lifetimes: {
    ready() {
    },
    attached() {
    },
    detached() {
    }
  },
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)

Component(connectedConfig)