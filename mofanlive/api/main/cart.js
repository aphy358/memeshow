import BaseApi from 'api'

/**
 * 购物车
 */
export default class CartApi extends BaseApi {

	/**
	 * 获取购物车商品列表
	 */
	async fetchItems() {
		return await this.get('/cart')
	}

	/**
   * 添加商品到购物车
   * 
   * @param {String} skuId 
   * @param {Number} quantity 
   * @param {String} productId 
	 * @param {Number} type // 优惠类型 0-无 1-内购 2-福袋
   */
	async addItem({ skuId, quantity, productId, type }) {
		return await this.post('/cart', { skuId, quantity, productId, type })
	}

	/**
   * 删除购物车中的商品
   * 
	 * @param {Array<string>} skuIds
   */
	async deleteItem(skuIds) {
		return await this.post('/cart/delete', { skuIds })
	}

	/**
   * 更新购物车中商品的数量
   * 
   * @param {String} skuId 
   * @param {Number} quantity 
   * @param {String} productId 
   */
	async updateItemQuantity({ skuId, quantity, productId }) {
		return await this.post('/cart/updateQuantity', { skuId, quantity, productId })
	}

}
