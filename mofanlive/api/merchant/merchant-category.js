import BaseApi from 'api'

/**
 * 分类
 */

export default class MerchantCategoryApi extends BaseApi {

  /**
   * 创建店铺分类
   *
   * @param {string} params.name
   * @param {number} params.sort
   */

  async create(params) {
    return await this.post('/merchant/category/create', params)
  }

  /**
   * 获取店铺分类列表
   */

  async shopCategories() {
    return await this.get('/merchant/category/getShopCategories')
  }

  /**
   * 获取平台分类列表
   */

  async platmCategories() {
    return await this.get('/merchant/category/getPlatformCategories')
  }

  /**
   * 创建店铺分类
   *
   * @param {*} params
   * @param {string} params.name
   * @param {string} params.sort
   */

  async createShopCategory(params) {
    return await this.post('/merchant/category/create', params)
  }

  /**
   * 删除店铺分类
   *
   * @param {*} id
   */

  async deleteShopCategory(id) {
    return await this.post(`/merchant/category/delete?id=${id}`)
  }

  /**
   * 更新商品分类
   *
   * @param {*} params
   * @param {*} params.id
   * @param {*} params.name
   * @param {*} params.sort
   */

  async updateShopCategory(params) {
    return await this.put('/merchant/category/update', params)
  }
}
