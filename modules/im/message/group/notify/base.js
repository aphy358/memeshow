import IMMessage from '../../base'

/**
 * 群系统消息 - 只发送给指定成员
 */
export default class IMGroupNotifyMessage extends IMMessage {

	messageType() {
		return "IMGroupNotifyMessage"
	}

	constructor(payload = {}) {
		super(payload)

		this.group = payload.groupProfile || null
	}
}