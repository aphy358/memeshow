import { connectComponent } from "wx-redux"
import './assets/avatar-default-1.png'
import './assets/avatar-default-2.png'
import './assets/avatar-default-3.png'

const mapStateToProps = state => ({
  defaultAvatar: state.systemConfig.defaultAvatar,
})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    // 头像类型 - 1：员工、2：用户、3：店铺
    type: {
      type: Number,
      value: 1,
    },

    // 头像 url
    url: {
      type: String,
      value: '',
    },

    // 头像大小
    size: {
      type: String,
      value: '',
    },

    // 是否为圆形
    circle: {
      type: Boolean,
      value: false,
    },

    // 头像边框
    border: {
      type: String,
      value: '',
    },
  },

  data: {
  },

  methods: {
    // 点击了头像
    onTapAvatar() {
      this.triggerEvent('tapAvatar')
    }
  },

  lifetimes: {
    ready() {
    }
  }
}))
