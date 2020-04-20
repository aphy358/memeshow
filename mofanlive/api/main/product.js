import BaseApi from "api"

/**
 * 商品
 */
export default class ProductApi extends BaseApi {
  /**
   * 商品详情
   *
   * @param {String} id
   */
  async retrieve(id) {
    return await this.get(`/product?id=${id}`)
  }

  /**
   * 商品列表
   *
   * @param {Number} pageNo
   * @param {String} categoryId
   * @param {String} sortType
   * @param {String} sortDirection
   * @param {String} keyword
   */
  async list(params) {
    return await this.get(`/products`, params)
  }
}
