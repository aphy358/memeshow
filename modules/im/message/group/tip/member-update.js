import IMGroupTipMessage from './base'

/**
 * 群成员资料更新
 */
export default class IMGroupMemberUpdateTipMessage extends IMGroupTipMessage {
	messageType() {
		return "IMGroupMemberUpdateTipMessage"
	}
	// 变化的群成员 IMGroupMember
	members = []
}