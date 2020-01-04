import IMMessage from './base'

/**
 * 位置消息
 */
export default class IMGeoMessage extends IMMessage {
	// 位置描述
	location = ""
	// 纬度
	latitude = 0
	// 经度
	longitude = 0
}