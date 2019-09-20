import BaseAPI from "./Base"

/**
 * @example
 */

export default class Category extends BaseAPI {
  async get(path, method) {
    return await this.request(path, method)
  }
}
