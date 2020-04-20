import { connectComponent } from "wx-redux"
import { chooseImage, uploadImage } from '@/utils/cos'
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

  },

  data: {
  },

  methods: {
    async chooseImg(e) {
      // 选择文件，获取临时路径
      const filePath = await chooseImage()

      // 将临时文件路径上传
      const url = await uploadImage(filePath)
      const info = await Api.UserProfile.updateUserInfo({ avatar: url })
      this.updateUserProfile(info)
    },
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