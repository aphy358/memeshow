import IMGroupTipMessage from './base'

/**
 * 群资料更新
 */
export default class IMGroupUpdateTipMessage extends IMGroupTipMessage {
	messageType() {
		return "IMGroupUpdateTipMessage"
	}
	// 更新群组信息 IMGroup
	group = null
}