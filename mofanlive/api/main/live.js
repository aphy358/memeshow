import BaseApi from 'api'

/**
 * 直播
 */
export default class LiveApi extends BaseApi {

	/**
	 * 获取直播列表
	 * 
	 * @param {String} type - 列表筛选，all => 全部
	 * @param {Number} cursor - 查询游标
	 */
	async list(params) {
		return await this.get(`/live/getRoomList`, params)
	}

	/**
	 * 创建直播房间，并自动成为大主播
	 *
	 * {
	 *	 "title": "string",
	 *   "cover": {
	 *     "isAnimated": true,	// 是否动画
	 *     "type": 0,						// 图片类型
	 *     "size": 0,						// 文件尺寸(字节)
	 *     "uri": "",						// uri 代表的是图片的id, 比如 http://oss.www.com/jsoidjfoiffef, uri 就是 jsoidjfoiffef
	 *     "width": 0,					// 图像宽度
	 *     "height": 0,					// 图像高度
	 *     "urls": [],					// url 列表
	 *     "avgColor": "",			// 图像的颜色均值
	 *   },
	 * 	 "location": {
	 *	   "title": "string",
	 *	 	 "lat": 0,
	 *		 "lon": 0
	 *   },
	 *   "ext": {}
	 * }
	 */
	async createRoom(params) {
		return await this.post(`/live/createRoom`, params)
	}

	/**
	 * 更新直播房间信息
	 *
	 * {
	 *	 "id": 0, - 房间ID
	 *	 "title": "string", - 房间名称
	 *	 "cover": "string", - 封面图片URL
	 *	 "location": {
	 *		 "title": "string",
	 *		 "lat": 0,
	 *		 "lon": 0
	 *	 },
	 *	 "ext": {}
	 * }
	 */
	async updateRoom(params) {
		return await this.post(`/live/updateRoom`, params)
	}

	/**
	 * 销毁直播房间（标准）
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async destroyRoom(roomId) {
		return await this.post(`/live/destroyRoom`, { roomId })
	}

	/**
	 * 销毁直播房间（硬删除）
	 */
	async destroyRoomForce() {
		return await this.post(`/test_destory_all_im`)
	}

	/**
	 * 观众获取直播房间信息
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async getRoomInfo(roomId) {
		return await this.get(`/live/getRoomInfo`, { roomId })
	}

	/**
	 * 主播获取直播房间信息
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async getAnchorRoomInfo(roomId) {
		return await this.get(`/live/getAnchorRoomInfo`, { roomId })
	}

	/**
	 * 申请加入直播房间成为小主播（连麦）
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async applyAnchor(roomId) {
		return await this.post(`/live/applyAnchor`, { roomId })
	}

	/**
	 * 直播房间添加小主播（连麦）
	 *
	 * @param {String} roomId - 直播房间ID
	 * @param {String} userId - 用户ID
	 */
	async addAnchor({ roomId, userId }) {
		return await this.post(`/live/addAnchor`, { roomId, userId })
	}

	/**
	 * 直播房间删除小主播（连麦）
	 *
	 * @param {String} roomId - 直播房间ID
	 * @param {String} userId - 用户ID
	 */
	async deleteAnchor({ roomId, userId }) {
		return await this.post(`/live/deleteAnchor`, { roomId, userId })
	}

	/**
	 * 主播心跳，5s一次，超过30s认为退出
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async anchorHeartbeat(roomId) {
		return await this.post(`/live/anchorHeartbeat`, { roomId })
	}

	/**
	 * 观众心跳，5s心跳一次，超过30秒认为退出房间
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async heartbeat(roomId) {
		return await this.post(`/live/heartbeat`, { roomId })
	}

	/**
	 * 开始混流（只有大主播有权限操作）
	 *
	 *  {
	 *		"opr_mix_stream_type": 0,
	 *		"output_stream_id": "string",
	 *		"output_stream_type": 0,
	 *		"input_stream_list": [
	 *			{}
	 *		]
	 *	}
	 */
	async mergeStream(params) {
		return await this.post(`/live/mergeStream`, params)
	}

	/**
	 * 观众加入直播房间
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async joinRoom(roomId) {
		return await this.post(`/live/joinRoom`, { roomId })
	}

	/**
	 * 观众退出直播房间
	 *
	 * @param {String} roomId - 直播房间ID
	 */
	async quitRoom(roomId) {
		return await this.post(`/live/quitRoom`, { roomId })
	}

	/**
	 * 获取房间观众列表
	 *
	 * @param {String} roomId - * 直播房间ID
	 * @param {Number} cursor - 直播房间ID
	 */
	async getAudiences(params) {
		return await this.get(`/live/getAudiences`, params)
	}

	/**
	 * 获取房间商品列表
	 * 
	 * @param {String} roomId - * 直播房间ID
	 */
	async getProducts(params) {
		return await this.get(`/live/getProducts`, params)
	}
}
