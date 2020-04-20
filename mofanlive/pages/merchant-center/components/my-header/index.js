import { connectComponent } from "wx-redux"
import { menuBtn } from "ui-kit/behaviors/index"
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
  behaviors: [menuBtn()],

  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {

  },

  methods: {
    async getUserInfo({ detail: { userInfo } }) {
      const { avatarUrl: avatar, city, country, gender, nickName: nickname, province } = userInfo

      wx.showLoading()
      let res = await Api.UserProfile.updateUserInfo({ nickname, avatar, gender, country, province, city })
      wx.hideLoading()

      if (!!res) {
        delete res.openUsers
        this.updateUserProfile(res)
      }
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