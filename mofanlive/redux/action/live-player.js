
import ActionTypes from '../action-types'

export default {

	/**
	 * 更新直播间信息
	 * 
	 * @param {Object} roomInfo 
	 */
	updateRoomInfo(roomInfo) {
		return {
			type: ActionTypes.LivePlayer.UpdateRoomInfo,
			payload: roomInfo
		}
	},

	/**
	 * 更新直播间商品列表
	 * 
	 * @param {Array} products 
	 */
	updateProducts(products) {
		return {
			type: ActionTypes.LivePlayer.UpdateProducts,
			payload: products
		}
	},

	/**
	 * 拉取店铺的商品列表
	 * 
	 * @param {Array} products 
	 */
	initProducts(products) {
		return {
			type: ActionTypes.LivePlayer.InitProducts,
			payload: products
		}
	}

}