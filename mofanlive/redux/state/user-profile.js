import _ from "lodash"
import Constants from "@/constants/open-platforms"

/**
 * 当前登录相关信息
 */
const defaultLoginInfo = {
  // 当前登录的平台
  openPlatform: '',
  // 后续登录token
  loginToken: ''
}

/**
 * 开放平台用户资料
 */
const defaultOpenUser = {
  id: 0,
  userId: 0,
  platform: "",
  openId: "",
  unionId: "",
  nickname: "",
  avatar: "",
  mobile: ""
}

/**
 * 用户资料
 */
const defaultUser = {
  id: 0,
  avatarLarge: "",
  avatarMedium: "",
  avatarThumb: "",
  birthday: 0,
  city: "",
  country: "",
  countryCode: "",
  customId: "",
  district: "",
  email: "",
  gender: 0,
  lastLoginTime: 0,
  location: "",
  mobile: "",
  nickname: "",
  province: "",
  registerTime: 0,
  shortId: 0,
  signature: "",
  openUsers: {},
  loginInfo: _.cloneDeep(defaultLoginInfo)
}

_.each(_.values(Constants.OpenPlatforms), it => {
  defaultUser.openUsers[it.value] = _.cloneDeep(defaultOpenUser)
})

export default defaultUser