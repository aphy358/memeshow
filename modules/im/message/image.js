import IMMessage from './base'

/**
 * 图片数据
 */
export class IMImage {
	// 宽度
	width = 0
	// 高度
	height = 0
	// 链接地址
	url = ""
	// 大小
	size = 0
	// 压缩比
	compress = 1
}

/**
 * 图片消息
 */
export default class IMImageMessage extends IMMessage {
	// 图片ID
	imageId = ""
	// 格式
	format = ""
	// 图片数据列表
	images = []
}