import Base from "./base/Base"

import { product } from "../data/product"

/**
 * 商品模块 APIs
 *
 * @class Product
 * @extends {Base}
 * @export
 */

export default class Product extends Base {
  /**
   * 获取 product
   * 
   * @param {string} id
   */
  getProduct(id) {
    // TODO use real data
    // return await this.get("")
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(product.data), 500)
    })
  }
}
