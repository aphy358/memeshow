/**
 * 群成员资料
 */
export default class IMGroupMember {
	// 用户ID
	userId = ""
	// 群组ID
	groupId = ""
	// 群昵称
	nickname = ""
	// 头像
	avatar = ""
	// 是否群主
	isOwner = false
	// 是否管理员
	isAdmin = false
	// 用户自定义数据
	customData = {}
}