import BaseApi from 'api'

export default class TestApi extends BaseApi {

  /**
   * 在session里设置 currentShopId
   */
  async test() {
    return await this.get('/test?shopId=42196021579776')
  }

}