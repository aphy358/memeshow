import IMMessage from '../../base'

/**
 * 群系统消息 - 只发送给指定成员
 */
export default class IMGroupNotifyMessage extends IMMessage {
	// 群组 IMGroup
	group = null
}