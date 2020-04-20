import BaseApi from 'api'

/**
 * 商品管理
 */

export default class MerchantProductApi extends BaseApi {

  /**
   * 商品详情
   *
   * @param {string} id
   */
  async detail(id) {
    return await this.get("/merchant/product", { id })
  }

  /**
   * 商品列表
   *
   * @param {object} params
   * @param {boolean} params.listing - 是否上架
   * @param {string} params.keyword - 查询关键字
   * @param {string} params.lastProductId - 游标
   */

  async list(params) {
    return await this.get("/merchant/products", params)
  }

  /**
   * 更新商品
   *
   * @param {object} params
   */

  async update(params) {
    return await this.put('/merchant/product', params)
  }

  /**
   * 创建商品
   *
   * @param {object} params - Product-DTO http://123.207.121.203:10281/#/merchant/product/put_merchant_product
   */

  async create(params) {
    return await this.post('/merchant/product', params)
  }

  /**
   * 创建商品属性项
   *
   * @param {string} key - 属性名称
   */

  async createProp(key) {
    return await this.post('/merchant/prop', { key })
  }

  /**
   * 创建商品属性值
   *
   * @param {object} pramas
   * @param {string} pramas.kid
   * @param {string[]} pramas.values
   */

  async createPropValue(pramas) {
    return await this.post('/merchant/prop/addValues', pramas)
  }

  /**
   * 上架
   *
   * @param {number} id
   */

  async onShelves(id) {
    return await this.post('/merchant/product/listing', { id })
  }

  /**
   * 下架
   *
   * @param {number} id
   */

  async offShelves(id) {
    return await this.post('/merchant/product/delisting', { id })
  }

  /**
   * 删除
   *
   * @param {*} id
   */

  async delete(id) {
    return await this.post(`/merchant/product/delete?id=${id}`)
  }
}
