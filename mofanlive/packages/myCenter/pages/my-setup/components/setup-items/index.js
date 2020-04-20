import { connectComponent } from "wx-redux"
import Action from '@/redux/action'
const Api = wx.X.Api
const router = wx.X.router

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

  },

  data: {

  },

  methods: {
    // 是否更换手机号
    wantToChangeMobile(e) {
      wx.showModal({
        title: '更换绑定的手机号？',
        content: '当前绑定的手机号为' + this.data.userProfile.mobile,
        confirmText: '更换',
        success (res) {
          if (res.confirm) {
            router.go("verifyAccount")
          }
        }
      })
    },

    async onSetBirthday({ detail }) {
      const birthday = +new Date(detail.value)
      const res = await Api.UserProfile.updateUserInfo({ birthday })
      if (!!res) {
        this.updateUserProfile(res)
      }
    },

    async onSetRegion({ detail }) {
      const params = {
        "province": detail.value[0],
        "city": detail.value[1],
        "district": detail.value[2],
      }

      const res = await Api.UserProfile.updateUserInfo(params)
      if (!!res) {
        this.updateUserProfile(res)
      }
    },

    onShowGenderPopup(e) {
      this.triggerEvent('onShowGenderPopup')
    },

    async onGetPhoneNumber({ detail }) {
      if (detail.errMsg !== 'getPhoneNumber:fail user deny') {
        const params = {
          "encryptedData": detail.encryptedData,
          "iv": detail.iv
        }

        try {
          const userProfile = await Api.UserProfile.setMobile(params)
          if (!!userProfile) {
            this.updateUserProfile(userProfile)
          }
        } catch (error) {
          if (error.response.data.code === 40012) {
            router.go("changeMobile")
          }
        }
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