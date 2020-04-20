import IMMessage from '../../base'

/**
 * 群通知广播消息
 */
export default class IMGroupTipMessage extends IMMessage {
	messageType() {
		return "IMGroupTipMessage"
	}
}