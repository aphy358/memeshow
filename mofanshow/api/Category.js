import Base from "./base/Base"

/**
 * 分类模块 APIs
 *
 * @class Category
 * @extends {Base}
 * @export
 */

export default class Category extends base {
  /**
   * 获取 categories
   */
  async getCategories() {
    return await this.get("category/list")
  }
}
