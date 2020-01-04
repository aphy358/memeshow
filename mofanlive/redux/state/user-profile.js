import _ from 'lodash'
import Constants from '../../constants'

/**
 * 开放平台用户资料
 */
const defaultOpenUser = {
	id: '',
	userId: 0,
	platform: '',
	openId: '',
	unionId: '',
	nickname: '',
	avatar: '',
	mobile: ''
}

/**
 * 用户资料
 */
const defaultUser = {
	id: 0,
	shortId: 0,
	customId: '',
	mobile: '',
	countryCode: '',
	email: '',
	nickname: '',
	avatarThumb: '',
	avatarMedium: '',
	avatarLarger: '',
	country: '',
	province: '',
	city: '',
	district: '',
	location: '',
	gender: 0,
	birthday: null,
	signature: '',
	registerTime: null,
	registerIp: '',
	lastLoginTime: null,
	lastLoginIp: '',
	openUsers: {
		"weixinApp": defaultOpenUser
	},
	openPlatform: ''
}

// 开放平台用户
_.each(_.values(Constants.OpenPlatforms), it => {
	defaultUser[it.value] = _.cloneDeep(defaultOpenUser)
})

// 转化为state数据
function toState(obj) {
	const state = _.mapValues(defaultUser, (_, k) => obj[k] || null)
	
	if (!!state.birthday) state.birthday = new Date(state.birthday).toLocaleDateString()
	else state.birthday = '未设置'

	if (!!state.registerTime) state.registerTime = new Date(state.registerTime).toLocaleDateString()
	if (!!state.lastLoginTime) state.registerTime = new Date(state.lastLoginTime).toLocaleDateString()

	state.openUsers = _.mapValues(defaultUser.openUsers, (v, k) => {
		if (!!state.openUsers[k]) {
			return _.mapValues(defaultOpenUser, (_, k2) => state.openUsers[k][k2] || null)
		} else {
			return _.cloneDeep(v)
		}
	})
	return state
}

export default defaultUser
export { defaultOpenUser, toState }