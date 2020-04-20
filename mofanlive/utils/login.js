import _ from 'lodash'
import Action from "@/redux/action"
import { switchContext } from "@/utils/context"

const Api = wx.X.Api
const store = wx.X.store
const dispatch = store.dispatch

export async function loginByCode() {
  const res = await wx.loginAsync()
  if (res && res.code) {
    await _login('loginByCode', res.code)
    // 这里是在启动时登录，后续会设置推荐信息，拿到上下文
  }
}

export async function loginByUserInfo({ encryptedData, iv }) {
  await _login('loginByUserInfo', { encryptedData, iv })
  // 这里不是在启动时登录，因此需要刷新上下文
  await _reloadContext()
}

export async function loginByMobile({ encryptedData, iv }) {
  await _login('loginByMobile', { encryptedData, iv })
  // 这里不是在启动时登录，因此需要刷新上下文
  await _reloadContext()
}

async function _reloadContext() {
  const context = await Api.Share.context()
  _setContext(context)
}

/**
 * 登录
 *
 * @param {*} method - 'loginByCode'、'loginByUserInfo'、'loginByMobile'
 * @param {*} params - 登录的参数
 */
async function _login(method, params) {
  const {
    userInfo,
    sellerInfo,
    oauthInfos,
    loginInfo
  } = await Api.Auth[method](params)

  if (userInfo && userInfo.id) {
    userInfo.openUsers = oauthInfos
    userInfo.loginInfo = loginInfo
    // TODO 这里是因为历史数据没有正确设置头像，进行修复
    userInfo.avatarLarge = userInfo.avatarLarge || oauthInfos.weixinApp.avatar
    userInfo.avatarMedium = userInfo.avatarMedium || oauthInfos.weixinApp.avatar
    userInfo.avatarThumb = userInfo.avatarThumb || oauthInfos.weixinApp.avatar
    _setUserProfile(userInfo)
  }

  if (sellerInfo) {
    _setSellerProfile(sellerInfo)
  }
}

// 将用户信息存入 redux
function _setUserProfile(userProfile) {
  dispatch(Action.userProfile.update(userProfile))
}

// 用户已开店设置卖家信息到 redux
function _setSellerProfile(sellerProfile) {
  dispatch(Action.sellerProfile.update(sellerProfile))
}

function _setContext(context) {
  switchContext(context)
  // dispatch(Action.context.update(context))
}