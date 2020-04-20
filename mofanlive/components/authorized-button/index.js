import { connectComponent } from "wx-redux"
import _ from 'lodash'
import { loginByUserInfo } from '@/utils/login'

const mapStateToProps = state => ({
  userProfile: state.userProfile,
})
const mapDispatchToProps = dispatch => ({})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  methods: {
    async login({ detail }) {
      if (detail.errMsg === "getUserInfo:ok") {
        wx.showLoading()
        await loginByUserInfo(detail)
        wx.hideLoading()
      }
    },
  },
}))