import { connectComponent } from "wx-redux"
import Action from '@/redux/action'
const Api = wx.X.Api

const mapStateToProps = state => ({
  userProfile: state.userProfile
})
const mapDispatchToProps = dispatch => ({
  updateUserProfile(userProfile) {
    dispatch(Action.userProfile.update(userProfile))
  }
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {

  },

  methods: {
    onHideGenderPopup(e) {
      this.triggerEvent('onHideGenderPopup')
    },

    async onToggleSex({ detail }) {
      const res = await Api.userProfile.updateUserInfo({ gender: detail.value })
      this.updateUserProfile(res)
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
}))