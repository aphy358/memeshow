import { connectBehavior } from "wx-redux"
import Action from "@/redux/action"

const Api = wx.X.Api

const mapStateToProps = state => ({
  userProfile: state.userProfile
})

const mapDispatchToProps = dispatch => ({
  setUserInfo(userProfile) {
    dispatch(Action.userProfile.update(userProfile))
  }
})

/**
 * 登录认证 Behavior 构造器
 *
 * @param {object} options
 * @param {boolean} options.silent - 拒绝登录时是否静默
 * @param {function} options.cancel - 拒绝登录时的回调
 *
 * @todo 界定完整的 options
 */

export function auth(options = {}) {
  return Behavior(
    connectBehavior(
      mapStateToProps,
      mapDispatchToProps
    )({
      data: {
        _token: "",
        isLogin: false
      },

      attached() {
        // const { userProfile } = this.data
        // if (userProfile && userProfile.id) this._update(userProfile.id)
        // else this._update()
      },

      ready() {
        if (!this.data._token) this.authorize()
      },

      observers: {
        userProfile(data) {
          if (data && data.id) this._update(data.id)
          else this._update()
        }
      },

      methods: {
        // 获取微信临时登录 code
        authorize() {
          wx.showModalAsync({
            title: "提示",
            content: "您还未登录，是否现在登录？",
            confirmText: "登录",
            cancelText: "取消"
          }).then(res => {
            if (res.confirm) this.login()
            else if (res.cancel) this._notLoginHandler()
          })
        },

        // 请求登录网关，获取用户信息
        async login() {
          const res = await wx.loginAsync()
          if (res && res.code) {
            const userProfile = await Api.Auth.loginByCode(res.code)
            if (userProfile && userProfile.id) {
              // 已注册用户直接登录成功
              this.setUserInfo(userProfile)
            } else {
              wx.showToastAsync({
                title: "登录失败",
                duration: 2000
              }).then(res => this._notLoginHandler())
            }
          }
        },

        // 认证登录状态
        check() {
          // todo check session code
        },

        // 更新 Behavior State
        _update(id = "") {
          this.data._token = id
          this.data.isLogin = !!id
          this.setData({ isLogin: !!id })
        },

        _notLoginHandler() {
          if (options.silent) return
          else if ( options.cancel && typeof options.cancel === "function") {
            options.cancel.call(this)
          }
          else {
            wx.redirectTo({
              url: "/packages/live/pages/live-pusher/index",
              fail: () => wx.navigateTo({
                url: "/packages/live/pages/live-pusher/index",
              })
             })
          }
        }
      }
    })
  )
}
