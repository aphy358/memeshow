import BaseApi from 'api'

/**
 * 分类
 */

export default class MerchantShopApi extends BaseApi {

  async retrieve() {
    return await this.get('/merchant/shop')
  }

	/**
	 * 更新店铺信息
	 * @param {string} id
	 * @param {string} name
	 * @param {string} description
	 * @param {string} mobile
	 * @param {string} wechat
	 * @param {string} email
	 * @param {string} avatar
	 * @param {string} background
	 * @param {array[string]} categoryIds
	 */
  async update(ctx) {
    return await this.post('/merchant/shop/update', ctx)
  }

  /**
   * 更新店铺退货地址配置
   * @param {string} name
   * @param {string} tel
   * @param {string} province
   * @param {string} city
   * @param {string} district
   * @param {string} address
   * @param {string} postalCode
   */
  async updateReturnAddress(ctx) {
    return await this.post("/merchant/shop/updateReturnAddress", ctx)
  }
}
